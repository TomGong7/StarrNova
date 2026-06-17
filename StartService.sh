#!/usr/bin/env bash
# ========================================
# StarrNova — Service Startup Script
# ========================================
set -euo pipefail

# ----------------------------------------
# Color definitions
# ----------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ----------------------------------------
# Global state
# ----------------------------------------
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/Backend"
SERVER_PID=""

# ----------------------------------------
# Helper functions
# ----------------------------------------

log_info()    { echo -e "${CYAN}[INFO]${NC}    $*"; }
log_ok()      { echo -e "${GREEN}[OK]${NC}      $*"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC}    $*"; }
log_fail()    { echo -e "${RED}[FAIL]${NC}    $*"; }

record_ok()   { echo -e "  ${GREEN}[PASS]${NC} $*"; }
record_fail() { echo -e "  ${RED}[FAIL]${NC} $*"; }

cleanup() {
    if [ -n "$SERVER_PID" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
        log_info "Stopping backend server (PID: $SERVER_PID)..."
        kill "$SERVER_PID" 2>/dev/null || true
        wait "$SERVER_PID" 2>/dev/null || true
        log_ok "Backend server (PID: $SERVER_PID) stopped."
    fi
}
trap cleanup EXIT INT TERM

print_banner() {
    echo ""
    echo -e "${BOLD}${CYAN}────────────────────────────────────────────${NC}"
    echo -e "${BOLD}${CYAN}      StarrNova — Service Startup${NC}"
    echo -e "${BOLD}${CYAN}────────────────────────────────────────────${NC}"
    echo ""
}

print_banner

# ----------------------------------------
# Step 1 — Load environment variables
# ----------------------------------------

if [ -f "$BACKEND_DIR/.env" ]; then
    while IFS= read -r line || [ -n "$line" ]; do
        case "$line" in
            \#*|'') continue ;;
        esac
        line=$(echo "$line" | sed 's/[[:space:]]*$//' | sed 's/\r$//')
        if [[ "$line" =~ ^[[:space:]]*([^=]+)=[[:space:]]*(.*)[[:space:]]*$ ]]; then
            name="${BASH_REMATCH[1]}"
            value="${BASH_REMATCH[2]}"
            value="${value%\"}"
            value="${value#\"}"
            value="${value%\'}"
            value="${value#\'}"
            export "$name=$value"
        fi
    done < "$BACKEND_DIR/.env"
    record_ok "Environment (.env loaded)"
else
    record_ok "Environment (defaults)"
fi

DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-root}"
DB_PASSWORD="${DB_PASSWORD:-}"
DB_NAME="${DB_NAME:-starrnova}"
SERVER_PORT="${PORT:-3000}"

# ----------------------------------------
# Step 2 — Verify prerequisites
# ----------------------------------------

if command -v node &>/dev/null; then
    NODE_VER=$(node -v)
    record_ok "Node.js ($NODE_VER)"
else
    record_fail "Node.js not installed or not in PATH"
    exit 1
fi

if command -v npm &>/dev/null; then
    NPM_VER=$(npm -v)
    record_ok "npm (v$NPM_VER)"
else
    record_fail "npm not installed or not in PATH"
    exit 1
fi

if command -v mysql &>/dev/null; then
    record_ok "MySQL client"
else
    record_fail "MySQL client not installed or not in PATH"
    exit 1
fi

# ----------------------------------------
# Step 3 — Start MySQL service
# ----------------------------------------

MYSQL_STARTED_BY_US=false

if [ "$(uname)" = "Darwin" ]; then
    if command -v brew &>/dev/null; then
        MYSQL_STATUS=$(brew services list 2>/dev/null | grep mysql || true)
        if echo "$MYSQL_STATUS" | grep -q "started"; then
            record_ok "MySQL service (already running)"
        else
            log_info "MySQL service is not running — attempting to start..."
            brew services start mysql 2>/dev/null && {
                sleep 3
                record_ok "MySQL service (started)"
                MYSQL_STARTED_BY_US=true
            } || {
                record_fail "MySQL service start failed"
                exit 1
            }
        fi
    else
        log_warn "Homebrew not found — cannot manage MySQL service automatically"
        record_ok "MySQL service (manual check)"
    fi
else
    log_info "Non-macOS detected — assuming MySQL is managed externally"
    record_ok "MySQL service (external)"
fi

# ----------------------------------------
# Step 4 — Verify database connectivity
# ----------------------------------------

MYSQL_CMD="mysql -h $DB_HOST -P $DB_PORT -u $DB_USER"
if [ -n "$DB_PASSWORD" ]; then
    MYSQL_CMD="$MYSQL_CMD -p$DB_PASSWORD"
fi

MYSQL_ERR=$(mktemp)
if $MYSQL_CMD -e "SELECT 1;" >/dev/null 2>"$MYSQL_ERR"; then
    record_ok "MySQL connection ($DB_HOST:$DB_PORT)"
    rm -f "$MYSQL_ERR"
else
    ERR_MSG=$(cat "$MYSQL_ERR")
    rm -f "$MYSQL_ERR"
    record_fail "MySQL connection failed ($DB_HOST:$DB_PORT): $ERR_MSG"
    exit 1
fi

if $MYSQL_CMD -e "USE \`$DB_NAME\`;" &>/dev/null; then
    record_ok "Database '$DB_NAME' (exists)"
else
    log_info "Database '$DB_NAME' does not exist — creating..."
    if $MYSQL_CMD -e "CREATE DATABASE \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" >/dev/null 2>/dev/null; then
        record_ok "Database '$DB_NAME' (created)"
    else
        record_fail "Failed to create database '$DB_NAME' — check MySQL permissions"
        exit 1
    fi
fi

# ----------------------------------------
# Step 5 — Install npm dependencies
# ----------------------------------------

cd "$BACKEND_DIR" || {
    record_fail "Backend directory not found: $BACKEND_DIR"
    exit 1
}

if [ -d "node_modules" ]; then
    record_ok "Dependencies (cached)"
else
    log_info "Installing dependencies (npm install)..."
    if npm install --no-audit --no-fund &>/dev/null; then
        record_ok "Dependencies (installed)"
    else
        record_fail "npm install failed — check network or package.json"
        exit 1
    fi
fi

# ----------------------------------------
# Step 6 — Verify app-level DB connection
# ----------------------------------------

DB_TEST_OUTPUT=$(node -e "
const mysql = require('mysql2/promise');
(async () => {
    const conn = await mysql.createConnection({
        host: '$DB_HOST', port: $DB_PORT, user: '$DB_USER',
        password: '$DB_PASSWORD', database: '$DB_NAME'
    });
    await conn.ping();
    await conn.end();
    console.log('OK');
})().catch(e => { console.error(e.message); process.exit(1); });
" 2>&1) || true

if [ "$DB_TEST_OUTPUT" = "OK" ]; then
    record_ok "App DB connection (verified)"
else
    record_fail "App DB connection failed: $DB_TEST_OUTPUT"
    exit 1
fi

# ----------------------------------------
# Step 7 — Start backend server
# ----------------------------------------

node server.js &
SERVER_PID=$!

HEALTH_URL="http://localhost:$SERVER_PORT/api/health"
MAX_RETRIES=15
RETRY=0
SERVER_UP=false

while [ $RETRY -lt $MAX_RETRIES ]; do
    sleep 1
    if curl -sf "$HEALTH_URL" &>/dev/null; then
        SERVER_UP=true
        break
    fi
    RETRY=$((RETRY + 1))
done

if [ "$SERVER_UP" = true ]; then
    record_ok "Backend server (port $SERVER_PORT)"
else
    record_fail "Backend server did not respond within ${MAX_RETRIES}s"
    exit 1
fi

# ----------------------------------------
# Done
# ----------------------------------------

echo ""
echo -e "  Frontend : ${CYAN}http://localhost:$SERVER_PORT/${NC}"
echo -e "  API      : ${CYAN}http://localhost:$SERVER_PORT/api/health${NC}"
echo -e "  Database : ${CYAN}$DB_HOST:$DB_PORT/$DB_NAME${NC}"
echo ""
echo -e "  Press ${YELLOW}Ctrl+C${NC} to stop"

wait "$SERVER_PID"