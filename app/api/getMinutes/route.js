import { NextResponse } from 'next/server';
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

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const sort = url.searchParams.get('sort') || 'date_desc'; // Default sorting option

  try {
    if (id) {
      // Fetch a specific minute by ID
      const [rows] = await pool.query('SELECT * FROM minutes WHERE id = ?', [id]);
      if (rows.length === 0) {
        return NextResponse.json({ error: 'No minute found with this ID' }, { status: 404 });
      }
      return NextResponse.json({ minute: rows[0] });
    } else {
      // Fetch all minutes with sorting
      let orderBy = 'date DESC'; // Default sorting
      if (sort === 'date_asc') {
        orderBy = 'date ASC';
      }
      // Add more sorting options if needed

      const [rows] = await pool.query(`SELECT * FROM minutes ORDER BY ${orderBy}`);
      return NextResponse.json({ minutes: rows, totalMinutes: rows.length });
    }
  } catch (error) {
    console.error('Error fetching minutes:', error);
    return NextResponse.json({ error: 'Failed to fetch minutes' }, { status: 500 });
  }
}
