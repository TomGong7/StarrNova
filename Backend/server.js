// ========================================
// StarrNova 本地开发服务器
// 配置: localhost:3000
// ========================================

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 导入模块
const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// 导入路由
const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/users');

// 中间件配置
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（Frontend 文件夹中的所有文件）
app.use(express.static(path.join(__dirname, '../Frontend')));

// 日志中间件
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ========================================
// API 路由
// ========================================

// 健康检查路由
app.use('/api', healthRoutes);

// 用户相关路由
app.use('/api/users', userRoutes);

// 前端页面路由配置
const pageRoutes = {
    '/': 'StarrNova.html',
    '/about': 'About/About.html',
    '/register': 'Register/Register.html',
    '/student': 'Student/StudentPortal.html',
    '/teacher': 'Teacher/TeacherPortal.html',
    '/admin': 'SysAdmin/SysAdminPortal.html'
};

Object.entries(pageRoutes).forEach(([route, file]) => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend', file));
    });
});

// ========================================
// 错误处理
// ========================================

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '404 - 请求的资源不存在',
        path: req.path
    });
});

// 错误处理中间件
app.use(errorHandler);

// ========================================
// 服务器启动
// ========================================

async function startServer() {
    try {
        // 测试数据库连接
        await db.testConnection();

        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════╗
║   StarrNova 开发服务器已启动           ║
╠════════════════════════════════════════╣
║   URL: http://localhost:${PORT}           ║
║   环境: ${process.env.NODE_ENV || 'development'}                 ║
║                                        ║
║   API 文档:                            ║
║   - GET  /api/health        (健康检查) ║
║   - POST /api/users/register(注册)    ║
║   - POST /api/users/login   (登录)    ║
║   - GET  /api/users/profile (个人信息)║
║   - GET  /api/users/list    (用户列表)║
║   - GET  /api/users/stats   (用户统计)║
║                                        ║
║   前端页面:                            ║
║   - http://localhost:${PORT}/          (首页)  ║
║   - http://localhost:${PORT}/about     (关于)  ║
║   - http://localhost:${PORT}/register  (注册)  ║
║   - http://localhost:${PORT}/student   (学生)  ║
║   - http://localhost:${PORT}/teacher   (教师)  ║
║   - http://localhost:${PORT}/admin     (管理员)║
║                                        ║
║   按 Ctrl+C 停止服务器                 ║
╚════════════════════════════════════════╝
            `);
        });
    } catch (err) {
        console.error('服务器启动失败:', err);
        process.exit(1);
    }
}

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n\n服务器已停止');
    process.exit(0);
});

// 启动服务器
startServer();

