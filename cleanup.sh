#!/usr/bin/env bash
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "⚠️  即将删除 Backend 目录及所有后端相关文件"
echo "   将保留: Frontend/ 目录、.vscode/ 配置"
read -p "   确认继续？(y/N): " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "已取消"
    exit 0
fi

echo ""
echo "[1/4] 删除 Backend/ ..."
rm -rf "$SCRIPT_DIR/Backend"
echo "      ✓ 已删除"

echo "[2/4] 删除后端相关脚本..."
rm -f "$SCRIPT_DIR/reset_db.sh"
rm -f "$SCRIPT_DIR/fix_zshrc.sh"
rm -f "$SCRIPT_DIR/terminal-init.sh"
rm -f "$SCRIPT_DIR/check_users.js"
echo "      ✓ 已删除"

echo "[3/4] 删除旧启动脚本..."
rm -f "$SCRIPT_DIR/StartService.sh"
echo "      ✓ 已删除"

echo "[4/4] 创建纯前端启动脚本..."
cat > "$SCRIPT_DIR/StartService.sh" << 'SERVER_EOF'
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
SERVER_EOF
chmod +x "$SCRIPT_DIR/StartService.sh"
echo "      ✓ 已创建"

echo ""
echo "✅ 清理完成！"
echo ""
echo "   目录结构:"
echo "   StarrNova/"
echo "   ├── Frontend/        ← 前端页面"
echo "   ├── .vscode/         ← IDE 配置"
echo "   └── StartService.sh  ← 前端启动脚本"
echo ""
echo "   运行 bash StartService.sh 启动前端"