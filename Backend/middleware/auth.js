// ========================================
// JWT 认证中间件
// ========================================

const jwt = require('jsonwebtoken');

// 验证 token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: '没有提供认证令牌'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: '无效的认证令牌'
        });
    }
}

// 生成 token
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
