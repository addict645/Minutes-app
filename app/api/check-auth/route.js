export async function GET(request) {
  try {
      const cookies = request.headers.get('Cookie');
      const authToken = cookies?.includes('authToken'); // Adjust token extraction as needed

      if (authToken) {
          return new Response(JSON.stringify({ authenticated: true }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
          });
      }

      return new Response(JSON.stringify({ authenticated: false }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
      console.error('Error checking auth:', error);
      return new Response(JSON.stringify({ authenticated: false }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  }
}
