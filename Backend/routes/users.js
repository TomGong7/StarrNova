// ========================================
// 用户路由
// ========================================

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

// 公开路由
router.post('/register', userController.register);
router.post('/login', userController.login);

// 受保护路由
router.get('/profile', verifyToken, userController.getUserInfo);
router.get('/list', verifyToken, userController.getAllUsers);
router.get('/stats', verifyToken, userController.getUserStats);

module.exports = router;
