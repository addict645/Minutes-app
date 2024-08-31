import { getAdminByUsername } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const admin = await getAdminByUsername(username);

    if (admin && await bcrypt.compare(password, admin.password)) {
      // Set authentication token or session here
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'authToken=someToken; Path=/; HttpOnly', // Set auth token
        },
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
