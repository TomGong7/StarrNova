// ========================================
// User Controller
// ========================================

const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/crypto');
const { generateToken } = require('../middleware/auth');
const { sendSuccess, sendError } = require('../utils/response');

// User registration
async function register(req, res) {
    try {
        const { username, email, password, fullName, userType, studentId } = req.body;

        // Input validation
        if (!username || !email || !password || !fullName || !userType) {
            return sendError(res, 'Missing required fields', 400);
        }

        // Check if username/email already exists
        const [existingUser, existingEmail] = await Promise.all([
            User.findByUsername(username),
            User.findByEmail(email)
        ]);

        if (existingUser) return sendError(res, 'Username already exists', 409);
        if (existingEmail) return sendError(res, 'Email already registered', 409);

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const userId = await User.create({
            username, email, password: hashedPassword, fullName, userType, studentId
        });

        sendSuccess(res, { userId }, 'Registration successful', 201);
    } catch (err) {
        console.error('Registration error:', err);
        sendError(res, 'Registration failed', 500, err);
    }
}

// User login
async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Input validation
        if (!username || !password) {
            return sendError(res, 'Username and password are required', 400);
        }

        // Find user and verify password
        const user = await User.findByUsername(username);
        if (!user) return sendError(res, 'Invalid username or password', 401);

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return sendError(res, 'Invalid username or password', 401);

        // Generate token
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
        }, 'Login successful');
    } catch (err) {
        console.error('Login error:', err);
        sendError(res, 'Login failed', 500, err);
    }
}

// Get user profile
async function getUserInfo(req, res) {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return sendError(res, 'User not found', 404);
        sendSuccess(res, { user });
    } catch (err) {
        console.error('Get user info error:', err);
        sendError(res, 'Failed to get user info', 500, err);
    }
}

// Get all users
async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        sendSuccess(res, { users });
    } catch (err) {
        console.error('Get user list error:', err);
        sendError(res, 'Failed to get user list', 500, err);
    }
}

// Get user stats
async function getUserStats(req, res) {
    try {
        const stats = await User.getStats();
        sendSuccess(res, { stats });
    } catch (err) {
        console.error('Get user stats error:', err);
        sendError(res, 'Failed to get user stats', 500, err);
    }
}

module.exports = {
    register,
    login,
    getUserInfo,
    getAllUsers,
    getUserStats
};