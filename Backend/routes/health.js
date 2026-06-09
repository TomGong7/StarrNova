// ========================================
// Health Check Routes
// ========================================

const express = require('express');
const router = express.Router();

// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'StarrNova backend is running',
        timestamp: new Date().toISOString()
    });
});

// API version
router.get('/version', (req, res) => {
    res.json({
        success: true,
        version: '1.0.0',
        name: 'StarrNova Backend API'
    });
});

module.exports = router;