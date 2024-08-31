// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'addict',
  password: 'Theeaddict@407',
  database: 'minutes_store_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function connectToDatabase() {
}

export async function getAdminByUsername(username) {
  const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
  return rows[0]; // Assuming username is unique
}

export async function getClientByUsername(username) {
  const [rows] = await pool.query('SELECT * FROM clients WHERE username = ?', [username]);
  return rows[0]; // Assuming username is unique
}

export default pool;
