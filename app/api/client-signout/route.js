export async function POST(request) {
    try {
      // Clear session or authentication tokens
      const cookieHeaders = new Headers();
      cookieHeaders.set('Set-Cookie', 'authToken=; Path=/; HttpOnly; Max-Age=0');
  
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          ...cookieHeaders
        },
      });
    } catch (error) {
      console.error('Error signing out client:', error);
      return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  