// ========================================
// User Database Model
// ========================================

const db = require('../config/db');

class User {
    // Create users table
    static async createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                starrnova_id VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                full_name VARCHAR(100),
                user_type ENUM('student', 'teacher', 'admin') NOT NULL,
                student_id VARCHAR(50) UNIQUE,
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        try {
            await db.query(sql);
            console.log('✓ users table created or already exists');
        } catch (err) {
            console.error('Failed to create users table:', err);
        }
    }

    // Create new user
    static async create(userData) {
        const { starrnovaId, email, password, fullName, userType, studentId } = userData;
        const sql = 'INSERT INTO users (starrnova_id, email, password, full_name, user_type, student_id) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            const [result] = await db.query(sql, [starrnovaId, email, password, fullName, userType, studentId]);
            return result.insertId;
        } catch (err) {
            throw err;
        }
    }

    // Find user by starrnova_id
    static async findByStarrnovaId(starrnovaId) {
        const sql = 'SELECT * FROM users WHERE starrnova_id = ?';
        try {
            const [rows] = await db.query(sql, [starrnovaId]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        try {
            const [rows] = await db.query(sql, [email]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Find user by ID
    static async findById(id) {
        const sql = 'SELECT id, starrnova_id, email, full_name, user_type, status, created_at FROM users WHERE id = ?';
        try {
            const [rows] = await db.query(sql, [id]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }

    // Get all users
    static async findAll() {
        const sql = 'SELECT id, starrnova_id, email, full_name, user_type, status, created_at FROM users';
        try {
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    // Update user
    static async update(id, userData) {
        const { fullName, status } = userData;
        const sql = 'UPDATE users SET full_name = ?, status = ? WHERE id = ?';
        try {
            const [result] = await db.query(sql, [fullName, status, id]);
            return result.affectedRows > 0;
        } catch (err) {
            throw err;
        }
    }

    // Delete user
    static async delete(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        try {
            const [result] = await db.query(sql, [id]);
            return result.affectedRows > 0;
        } catch (err) {
            throw err;
        }
    }

    // Get user stats by type
    static async getStats() {
        const sql = 'SELECT user_type, COUNT(*) as count FROM users GROUP BY user_type';
        try {
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;