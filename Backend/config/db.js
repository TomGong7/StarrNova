// ========================================
// Database Configuration
// ========================================

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'starrnova',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection — silent on success, throws on failure
async function testConnection() {
    const connection = await pool.getConnection();
    connection.release();
    return true;
}

module.exports = {
    pool,
    testConnection,
    query: (sql, args) => pool.query(sql, args)
};