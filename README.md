# 🎓 StarrNova - 一站式智能教育平台

## 📌 项目概述

StarrNova 是一个一站式智能教育平台，致力于为高等教育机构提供全面、智能的教学管理解决方案。

该平台面向大学，以后成熟后再计划开发面向中小学的功能。
- **前端技术**: HTML5 + CSS3 + JavaScript
- **后端技术**: Node.js + Express + MySQL
- **认证方式**: JWT (JSON Web Token)
- **功能模块**: 用户管理、课程管理、作业管理、成绩管理、数据分析

---

## 📁 项目整体结构

```
StarrNova/
├── Frontend/                    # 前端项目
│   ├── Styles.css              # 通用样式
│   ├── Main.js                 # 通用 JavaScript
│   ├── StarrNova.html          # 欢迎页
│   ├── About/                  # 关于页面
│   ├── Register/               # 注册页面
│   ├── Student/                # 学生首页
│   ├── Teacher/                # 教师首页
│   └── SysAdmin/               # 管理员首页
│
├── Backend/                     # 后端项目
│   ├── config/                 # 配置文件
│   ├── routes/                 # API 路由
│   ├── controllers/            # 业务逻辑
│   ├── models/                 # 数据模型
│   ├── middleware/             # 中间件
│   ├── utils/                  # 工具函数
│   ├── server.js               # 主服务器
│   ├── package.json            # npm 配置
│   └── .env.example            # 环境变量示例
│
└── README.md                    # 项目文档
```

---

## 🚀 快速开始

### 前端开发

#### 1. 直接打开（无需服务器）
```bash
# 在浏览器中打开
Frontend/StarrNova.html
```

#### 2. 通过后端服务器访问
```bash
# 启动后端服务器后，访问：
http://localhost:3000/
```

### 后端开发

#### 1. 安装依赖
```bash
cd Backend
npm install
```

#### 2. 配置环境变量
```bash
cp .env.example .env

# 编辑 .env 文件，配置以下内容：
# - 数据库主机、用户名、密码、数据库名称
# - JWT 秘钥
# - CORS 跨域源
```

#### 3. 启动服务器
```bash
npm start
```

服务器将在 `http://localhost:3000` 启动

---

# 📱 前端文档

## 前端项目概述

StarrNova 前端部分采用 HTML/CSS/JavaScript 编写。

## 项目结构

```
Frontend/
├── Styles.css              # 通用样式 - 所有页面的公共CSS
├── Main.js                 # 通用JavaScript - 所有页面的公共函数
├── StarrNova.html          # 欢迎页
├── StarrNova.js            # 欢迎页特有JavaScript
├── StarrNova.css           # 欢迎页特有CSS
│
├── About/                  # 关于我们页面
│   ├── About.html
│   ├── About.js            # 关于页面特有JavaScript
│   └── About.css           # 关于页面特有CSS
│
├── Register/               # 注册页面
│   ├── Register.html
│   ├── Register.js         # 注册页面特有JavaScript
│   └── Register.css        # 注册页面特有CSS
│
├── Student/                # 学生首页
│   ├── StudentPortal.html
│   ├── Student.js          # 学生首页特有JavaScript
│   └── StudentPortal.css   # 学生首页特有CSS
│
├── Teacher/                # 教师首页
│   ├── TeacherPortal.html
│   ├── Teacher.js          # 教师首页特有JavaScript
│   └── TeacherPortal.css   # 教师首页特有CSS
│
└── SysAdmin/               # 管理员首页
    ├── SysAdminPortal.html
    ├── SysAdmin.js         # 管理员首页特有JavaScript
    └── SysAdminPortal.css  # 管理员首页特有CSS
```

## 文件说明

### 通用文件

#### Styles.css
包含所有页面共用的样式定义，包括：
- 全局样式（HTML, body 等）
- 页面布局（container, wrapper 等）
- 导航栏样式
- 页脚样式
- 按钮样式
- 表单样式
- 消息提示样式
- 标题和文本样式
- 表格样式
- 卡片样式
- 响应式设计

#### Main.js
包含所有页面共用的 JavaScript 功能，包括：
- DOMContentLoaded 初始化
- 导航栏管理
- 表单验证（邮箱、密码强度）
- 提示消息显示
- 本地存储管理
- 日期格式化
- 防抖和节流函数
- 用户登录状态检查
- 登出函数

### 页面文件

每个页面文件夹包含三个文件：

#### HTML 文件
- 页面的结构和内容
- 引入相关的 CSS 和 JavaScript 文件
- 每个页面都包含导航栏和页脚

#### CSS 文件
- 该页面特有的样式
- 为了方便维护，特有样式应该放在页面专有的 CSS 文件中

#### JavaScript 文件
- 该页面特有的功能
- 页面加载完成后的初始化逻辑
- 页面特定的事件处理器

## 页面说明

### 1. 欢迎页 (StarrNova.html)
- 平台的首页和入口
- 展示平台特色和用户角色介绍
- 提供注册和登录入口

### 2. 关于页面 (About/About.html)
- 介绍 StarrNova 平台的使命、优势和发展规划
- 提供联系方式

### 3. 注册页面 (Register/Register.html)
- 用户注册表单
- 支持学生、教师、管理员三种角色注册
- 包含表单验证

### 4. 学生首页 (Student/StudentPortal.html)
- 学生登录后的主界面
- 显示个人信息、我的课程、待处理任务

### 5. 教师首页 (Teacher/TeacherPortal.html)
- 教师登录后的主界面
- 显示授课统计、我的课程、最新作业评改

### 6. 管理员首页 (SysAdmin/SysAdminPortal.html)
- 管理员登录后的主界面
- 显示系统统计、用户统计、系统监控

## 前端代码规范

### CSS 规范
- 通用样式放在 Styles.css
- 页面特有样式放在各自的 CSS 文件
- 使用类选择器命名规范：`.page-name-element`
- 在 CSS 文件顶部添加注释说明

### JavaScript 规范
- 通用函数放在 Main.js
- 页面特有函数放在各自的 JS 文件
- 使用 camelCase 命名函数
- 在 JavaScript 文件顶部添加注释说明

### HTML 规范
- 使用语义化的 HTML5 标签
- 为每个表单元素添加正确的 label
- 使用 data-* 属性存储数据
- 保持代码缩进和格式规范

## 前端注意事项

1. 所有页面都已包含导航栏和页脚
2. 所有页面都支持响应式设计（适配移动设备）
3. 使用相对路径引入资源，方便跨目录访问
4. 所有颜色主题已统一（紫色系和红色系）

---

# 🔧 后端文档

## 后端项目结构

```
Backend/
├── config/                 # 配置文件
│   └── db.js              # 数据库连接配置
├── routes/                # API 路由
│   ├── health.js          # 健康检查路由
│   └── users.js           # 用户路由
├── controllers/           # 控制器
│   └── userController.js  # 用户控制器
├── models/                # 数据模型
│   └── User.js            # 用户模型
├── middleware/            # 中间件
│   ├── auth.js            # 认证中间件
│   └── errorHandler.js    # 错误处理中间件
├── utils/                 # 工具函数
│   └── crypto.js          # 加密工具
├── .env.example           # 环境变量示例
├── .gitignore             # Git 忽略文件
├── package.json           # npm 配置
└── server.js              # 主服务器文件
```

## 后端依赖

- **express** - Web 框架
- **mysql2** - MySQL 数据库驱动
- **bcryptjs** - 密码加密
- **jsonwebtoken** - JWT 认证
- **dotenv** - 环境变量管理
- **cors** - 跨域资源共享
- **body-parser** - 请求体解析

## 后端 API 文档

### 健康检查
```
GET /api/health
GET /api/version
```

### 用户相关 API

#### 用户注册
```
POST /api/users/register

请求体:
{
    "username": "用户名",
    "email": "邮箱地址",
    "password": "密码",
    "fullName": "真实姓名",
    "userType": "student|teacher|admin",
    "studentId": "学号/工号"
}

响应:
{
    "success": true,
    "message": "注册成功",
    "userId": 1
}
```

#### 用户登录
```
POST /api/users/login

请求体:
{
    "username": "用户名",
    "password": "密码"
}

响应:
{
    "success": true,
    "message": "登录成功",
    "token": "JWT_TOKEN",
    "user": {
        "id": 1,
        "username": "用户名",
        "email": "邮箱",
        "fullName": "真实姓名",
        "userType": "student"
    }
}
```

#### 获取个人信息
```
GET /api/users/profile
Headers: Authorization: Bearer JWT_TOKEN

响应:
{
    "success": true,
    "user": {
        "id": 1,
        "username": "用户名",
        "email": "邮箱",
        "full_name": "真实姓名",
        "user_type": "student",
        "status": "active",
        "created_at": "2026-06-08T11:00:00Z"
    }
}
```

#### 获取所有用户（管理员）
```
GET /api/users/list
Headers: Authorization: Bearer JWT_TOKEN

响应:
{
    "success": true,
    "users": [...]
}
```

#### 获取用户统计（管理员）
```
GET /api/users/stats
Headers: Authorization: Bearer JWT_TOKEN

响应:
{
    "success": true,
    "stats": [
        {
            "user_type": "student",
            "count": 100
        },
        ...
    ]
}
```

## 数据库配置

### MySQL 表结构

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    user_type ENUM('student', 'teacher', 'admin') NOT NULL,
    student_id VARCHAR(50) UNIQUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 环境变量配置

编辑 `Backend/.env` 文件：

```
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=starrnova

# JWT 配置
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# CORS 配置
CORS_ORIGIN=http://localhost:3000
```

## 认证说明

API 使用 JWT (JSON Web Token) 进行认证：

1. 通过 `/api/users/login` 登录获取 token
2. 在请求头中携带 token: `Authorization: Bearer <token>`
3. 默认过期时间: 7 天

## 后端安全特性

1. **密码加密** - 使用 bcryptjs 对密码进行加密
2. **JWT 认证** - 使用 JWT token 进行 API 认证
3. **CORS 跨域** - 配置允许的跨域请求源
4. **输入验证** - 对所有输入进行验证
5. **错误处理** - 统一的错误处理中间件

---

# 📋 开发计划

## 第一阶段（已完成）
- [x] 前端基础页面设计
- [x] 后端服务器框架搭建
- [x] 数据库模型设计
- [x] 用户认证系统

## 第二阶段（开发中）
- [ ] 课程管理模块
- [ ] 作业管理模块
- [ ] 成绩管理模块
- [ ] 前后端 API 集成

## 第三阶段（计划中）
- [ ] 消息通知模块
- [ ] 文件上传功能
- [ ] 数据统计分析
- [ ] 单元测试和部署脚本

## 未来计划
- [ ] 面向中小学功能开发
- [ ] 移动应用开发
- [ ] 大数据分析功能
- [ ] AI 智能推荐

---

# 💡 使用说明

## 前端开发工作流

1. **编辑 HTML** - 在 Frontend 文件夹中修改对应的 `.html` 文件
2. **编辑样式** - 通用样式在 `Styles.css`，页面特有样式在各自的 `.css` 文件
3. **编辑脚本** - 通用函数在 `Main.js`，页面特有逻辑在各自的 `.js` 文件
4. **测试** - 在浏览器中打开 HTML 文件或通过服务器访问

## 后端开发工作流

1. **添加路由** - 在 `Backend/routes/` 中添加新的路由文件
2. **编写控制器** - 在 `Backend/controllers/` 中实现业务逻辑
3. **创建模型** - 在 `Backend/models/` 中定义数据模型
4. **测试 API** - 使用 Postman 或其他工具测试 API

## 添加新页面（前端）

1. 在相应的文件夹中创建新的 HTML 文件
2. 创建对应的 CSS 文件（如果有特殊样式）
3. 创建对应的 JavaScript 文件（如果有特殊功能）
4. 在 HTML 文件中引入 `Styles.css` 和 `Main.js`
5. 在导航栏中添加新页面的链接

## 添加新 API（后端）

1. 在 `Backend/models/` 中定义数据模型
2. 在 `Backend/controllers/` 中编写业务逻辑
3. 在 `Backend/routes/` 中创建路由
4. 在 `Backend/server.js` 中注册路由
5. 测试 API

## 本地存储使用（前端）

项目使用 `localStorage` 存储用户信息：
- `userId` - 用户ID
- `userType` - 用户类型（student/teacher/admin）
- `userName` - 用户名称

---

# 📝 项目规范

## 代码命名规范

- HTML：使用小写字母和连字符（如：`user-info`）
- CSS：使用小写字母和连字符（如：`.card-header`）
- JavaScript：使用驼峰命名法（如：`getUserInfo()`）
- 数据库：使用小写字母和下划线（如：`user_type`）

## 文件组织规范

- 通用文件放在项目根目录或相应的文件夹根目录
- 页面特有文件放在对应的页面文件夹
- 配置文件放在 `config/` 文件夹
- 工具函数放在 `utils/` 文件夹

## 提交规范

- 每次提交应包含一个完整的功能或修复
- 提交消息应简洁清晰（如：`feat: 添加用户注册功能`）
- 定期推送代码到远程仓库

---

# 📧 联系方式

- **邮箱**: info@starrnova.com
- **项目地址**: [GitHub Repository]

---

**最后修改时间**: 2026-06-08

