import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: 'Missing email or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const [rows] = await pool.query('SELECT * FROM clients WHERE email = ?', [email]);
    const client = rows[0];

    if (!client) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isMatch = await bcrypt.compare(password, client.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Set authentication token or cookie
    const authToken = 'your-generated-auth-token'; // Generate or fetch the token here

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Set-Cookie': `authToken=${authToken}; Path=/; HttpOnly; Max-Age=3600` // Set the cookie
      },
    });
  } catch (error) {
    console.error('Error signing in client:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
