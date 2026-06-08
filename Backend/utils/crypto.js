// ========================================
// 加密工具
// ========================================

const bcrypt = require('bcryptjs');

// 密码加密
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// 密码验证
async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    comparePassword
};
