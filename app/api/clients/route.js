// app/api/clients/route.js
import pool from '@/lib/db';

export async function GET() {
  try {
    const [clients] = await pool.query('SELECT * FROM clients');
    return new Response(JSON.stringify(clients), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
