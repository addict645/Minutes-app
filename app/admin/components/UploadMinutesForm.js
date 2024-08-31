'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';
import Editor from '../components/Editor'; // Adjust path as needed

export default function UploadMinutesForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    const sanitizedContent = DOMPurify.sanitize(content); // Sanitize content

    try {
      const res = await fetch('/api/uploadMinutes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: sanitizedContent }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage('Minutes uploaded successfully!');
        setTitle('');
        setContent('');
        setTimeout(() => {
          router.push('/admin'); // Redirect after 2 seconds
        }, 2000);
      } else {
        setMessage(`Error: ${data.error || 'Failed to upload minutes.'}`);
      }
    } catch (error) {
      setMessage('Failed to upload minutes.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">Content</label>
          <Editor
            value={content}
            onChange={setContent}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
}
