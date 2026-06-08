// ========================================
// 健康检查路由
// ========================================

const express = require('express');
const router = express.Router();

// 健康检查
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'StarrNova 后端服务正常运行',
        timestamp: new Date().toISOString()
    });
});

// 获取 API 版本
router.get('/version', (req, res) => {
    res.json({
        success: true,
        version: '1.0.0',
        name: 'StarrNova Backend API'
    });
});

module.exports = router;
