// ========================================
// StarrNova Development Server
// Config: localhost:3000
// ========================================

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import modules
const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/users');

// Middleware configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the Frontend directory
app.use(express.static(path.join(__dirname, '../Frontend')));

// ========================================
// API Routes
// ========================================

// Health check routes
app.use('/api', healthRoutes);

// User routes
app.use('/api/users', userRoutes);

// Frontend page routes
const pageRoutes = {
    '/': 'StarrNova.html',
    '/about': 'About/About.html',
    '/register': 'Register/Register.html',
    '/student': 'Student/StudentPortal.html',
    '/teacher': 'Teacher/TeacherPortal.html',
    '/admin': 'SysAdmin/SysAdminPortal.html'
};

// Fix: redirect /Frontend/* requests to root (e.g. /Frontend/StarrNova.html → /StarrNova.html)
app.use('/Frontend', (req, res) => {
    res.redirect(req.url);
});

Object.entries(pageRoutes).forEach(([route, file]) => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend', file));
    });
});

// ========================================
// Error Handling
// ========================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '404 - Resource not found',
        path: req.path
    });
});

// Error handler middleware
app.use(errorHandler);

// ========================================
// Server Startup
// ========================================

async function startServer() {
    try {
        // Verify database connection
        await db.testConnection();

        app.listen(PORT, () => {});
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nServer stopped.');
    process.exit(0);
});

// Start
startServer();