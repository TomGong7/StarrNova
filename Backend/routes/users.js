// ========================================
// User Routes
// ========================================

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', verifyToken, userController.getUserInfo);
router.get('/list', verifyToken, userController.getAllUsers);
router.get('/stats', verifyToken, userController.getUserStats);

module.exports = router;