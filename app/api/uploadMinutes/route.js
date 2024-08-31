// app/api/uploadMinutes/route.js
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a connection pool to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'addict',
  password: 'Theeaddict@407',
  database: 'minutes_store_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(request) {
  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const [result] = await connection.execute(
      'INSERT INTO minutes (title, content) VALUES (?, ?)',
      [title, content]
    );

    return NextResponse.json({ message: 'Minutes uploaded successfully', id: result.insertId });
  } catch (error) {
    console.error('Error uploading minutes:', error.message); // Log error message
    return NextResponse.json({ error: `Failed to upload minutes: ${error.message}` }, { status: 500 });
  } finally {
    if (connection) {
      connection.release(); // Release connection back to the pool
    }
  }
}
