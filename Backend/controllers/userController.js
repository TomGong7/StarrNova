// ========================================
// 用户控制器
// ========================================

const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/crypto');
const { generateToken } = require('../middleware/auth');
const { sendSuccess, sendError } = require('../utils/response');

// 用户注册
async function register(req, res) {
    try {
        const { username, email, password, fullName, userType, studentId } = req.body;

        // 输入验证
        if (!username || !email || !password || !fullName || !userType) {
            return sendError(res, '缺少必要的字段', 400);
        }

        // 检查用户名/邮箱是否存在
        const [existingUser, existingEmail] = await Promise.all([
            User.findByUsername(username),
            User.findByEmail(email)
        ]);

        if (existingUser) return sendError(res, '用户名已存在', 409);
        if (existingEmail) return sendError(res, '邮箱已被注册', 409);

        // 密码加密并创建用户
        const hashedPassword = await hashPassword(password);
        const userId = await User.create({
            username, email, password: hashedPassword, fullName, userType, studentId
        });

        sendSuccess(res, { userId }, '注册成功', 201);
    } catch (err) {
        console.error('注册错误:', err);
        sendError(res, '注册失败', 500, err);
    }
}

// 用户登录
async function login(req, res) {
    try {
        const { username, password } = req.body;

        // 输入验证
        if (!username || !password) {
            return sendError(res, '用户名和密码不能为空', 400);
        }

        // 查找用户并验证密码
        const user = await User.findByUsername(username);
        if (!user) return sendError(res, '用户名或密码错误', 401);

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return sendError(res, '用户名或密码错误', 401);

        // 生成 token
        const token = generateToken(user.id, user.user_type);
        sendSuccess(res, {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.full_name,
                userType: user.user_type
            }
        }, '登录成功');
    } catch (err) {
        console.error('登录错误:', err);
        sendError(res, '登录失败', 500, err);
    }
}

// 获取用户信息
async function getUserInfo(req, res) {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return sendError(res, '用户不存在', 404);
        sendSuccess(res, { user });
    } catch (err) {
        console.error('获取用户信息错误:', err);
        sendError(res, '获取用户信息失败', 500, err);
    }
}

// 获取所有用户
async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        sendSuccess(res, { users });
    } catch (err) {
        console.error('获取用户列表错误:', err);
        sendError(res, '获取用户列表失败', 500, err);
    }
}

// 获取用户统计
async function getUserStats(req, res) {
    try {
        const stats = await User.getStats();
        sendSuccess(res, { stats });
    } catch (err) {
        console.error('获取用户统计错误:', err);
        sendError(res, '获取用户统计失败', 500, err);
    }
}

module.exports = {
    register,
    login,
    getUserInfo,
    getAllUsers,
    getUserStats
};
