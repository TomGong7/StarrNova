# StarrNova - 一站式智能教育平台

## 项目概述

StarrNova 是一个一站式智能教育平台，致力于为高等教育机构提供全面、智能的教学管理解决方案。

该项目名称为StarrNova，是一个一站式智能教育平台。该平台面向大学，以后成熟后再计划开发面向中小学的功能。该平台前端初步采用html编写，后端数据库使用MySQL。

---

# 前端项目结构说明

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

## 代码规范

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

## 使用说明

### 在浏览器中打开
1. 直接在浏览器中打开 `Frontend/StarrNova.html` 即可查看欢迎页
2. 点击相应的链接导航到其他页面

### 添加新页面
1. 在相应的文件夹中创建新的 HTML 文件
2. 创建对应的 CSS 文件（如果有特殊样式）
3. 创建对应的 JavaScript 文件（如果有特殊功能）
4. 在 HTML 文件中引入 Styles.css 和 Main.js
5. 在导航栏中添加新页面的链接

### 本地存储使用
项目使用 localStorage 存储用户信息：
- `userId`: 用户ID
- `userType`: 用户类型（student/teacher/admin）
- `userName`: 用户名称

## 后续开发计划

- [ ] 实现用户登录/注册功能
- [ ] 连接后端 API
- [ ] 实现动态数据加载
- [ ] 添加更多交互功能
- [ ] 性能优化
- [ ] 浏览器兼容性测试

## 前端项目注意事项

1. 所有页面都已包含导航栏和页脚
2. 所有页面都支持响应式设计（适配移动设备）
3. 使用相对路径引入资源，方便跨目录访问
4. 所有颜色主题已统一（紫色系和红色系）

---

最后修改时间: 2026-06-08
