export async function POST(request) {
    try {
      // Clear authentication token or session cookie
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'authToken=; Path=/; HttpOnly; Max-Age=0', // Clear auth cookie
        },
      });
    } catch (error) {
      console.error('Error signing out admin:', error);
      return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  