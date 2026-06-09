// ========================================
// JWT Authentication Middleware
// ========================================

const jwt = require('jsonwebtoken');

// Verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No authentication token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid authentication token'
        });
    }
}

// Generate token
function generateToken(userId, userType) {
    return jwt.sign(
        { userId, userType },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
}

module.exports = {
    verifyToken,
    generateToken
};