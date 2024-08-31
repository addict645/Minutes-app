// lib/db.js
import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to the database (optional)
export async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database');
    connection.release(); // Release connection back to pool
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Fetch an admin by username
export async function getAdminByUsername(username) {
  try {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0]; // Assuming username is unique
  } catch (error) {
    console.error('Error fetching admin by username:', error);
    throw error;
  }
}

// Fetch a client by username
export async function getClientByUsername(username) {
  try {
    const [rows] = await pool.query('SELECT * FROM clients WHERE username = ?', [username]);
    return rows[0]; // Assuming username is unique
  } catch (error) {
    console.error('Error fetching client by username:', error);
    throw error;
  }
}

export default pool;
