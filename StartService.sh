
# ========================================
# StarrNova Backend Service Starter Script
# ========================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}  StarrNova Backend Service Starter  ${NC}"
echo -e "${YELLOW}========================================${NC}"

# 检查是否存在 node_modules
if [ ! -d "./Backend/node_modules" ]; then
    echo -e "${YELLOW}[INFO] node_modules Not Found   Installing Dependencies...${NC}"
    cd Backend || exit 1
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}[SUCCESS] Dependencies Installed Successfully${NC}"    
    else
        echo -e "${RED}[ERROR] Dependencies Installation Failed, Please Check Your Network Connection${NC}"
        exit 1
    fi
else
    cd Backend || exit 1
    echo -e "${GREEN}[INFO] Dependencies Already Installed, Skipping Installation${NC}"
fi

# 检查环境变量文件
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}[WARNING] .env File Not Found, Using Default Configuration${NC}"
fi

echo -e "${YELLOW}[INFO] Starting Backend Service...${NC}"
echo ""

# 启动服务
npm start

# 退出处理
if [ $? -eq 0 ]; then
    echo -e "${GREEN}[SUCCESS] Backend Service Started Successfully${NC}"
else
    echo -e "${RED}[ERROR] Backend Service Start Failed or Abnormally Exited${NC}"
    exit 1
fi