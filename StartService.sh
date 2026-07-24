#!/usr/bin/env bash
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-3000}"

echo ""
echo "────────────────────────────────────────────"
echo "      StarrNova — Frontend Server"
echo "────────────────────────────────────────────"
echo ""

cd "$SCRIPT_DIR/Frontend"

if command -v python3 &>/dev/null; then
    echo "  地址: http://localhost:$PORT/"
    echo "  按 Ctrl+C 停止"
    echo ""
    python3 -m http.server $PORT
else
    echo "  错误: 未找到 python3"
    exit 1
fi
