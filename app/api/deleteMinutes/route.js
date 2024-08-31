// app/api/deleteMinutes/route.js
import { connectToDatabase } from '@/lib/db';

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response('ID is required', { status: 400 });
    }

    const connection = await connectToDatabase();
    const [result] = await connection.execute('DELETE FROM minutes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return new Response('Minute not found', { status: 404 });
    }

    return new Response('Minute deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/deleteMinutes:', error);
    return new Response('Failed to delete minute', { status: 500 });
  }
}
