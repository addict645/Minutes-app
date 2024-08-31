import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'addict',
  password: 'Theeaddict@407',
  database: 'minutes_store_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Handle GET requests to fetch all minutes
export async function GET(request) {
  try {
    const [rows] = await pool.query('SELECT * FROM minutes');
    if (rows.length === 0) {
      return NextResponse.json({ minutes: [] });
    }
    return NextResponse.json({ minutes: rows });
  } catch (error) {
    console.error('Error fetching minutes:', error);
    return NextResponse.json({ error: 'Failed to fetch minutes' }, { status: 500 });
  }
}

// Handle PUT requests to update a specific minute
export async function PUT(request) {
  try {
    const { id, title, content } = await request.json();

    if (!id || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await pool.query(
      'UPDATE minutes SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Minute not found or not updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Minute updated successfully' });
  } catch (error) {
    console.error('Error updating minute:', error);
    return NextResponse.json({ error: 'Failed to update minute' }, { status: 500 });
  }
}
