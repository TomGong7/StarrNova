#!/bin/bash

# StarrNova 后端一键启动脚本

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  StarrNova 后端启动脚本                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$SCRIPT_DIR/Backend"

if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}✗ 错误: 找不到 Backend 文件夹${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ 错误: 未检测到 Node.js${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js 已安装${NC}"

cd "$BACKEND_DIR" || exit 1

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}→ 正在安装依赖...${NC}"
    npm install
fi

if [ ! -f ".env" ] && [ -f ".env.example" ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠ 请编辑 .env 文件配置数据库信息${NC}"
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}启动服务器中...${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""

npm start
