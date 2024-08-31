'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Editor from '../components/Editor'; // Adjust path as needed

const EditMinute = () => {
  const [minute, setMinute] = useState(null);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Retrieve the ID from query parameters

  useEffect(() => {
    const fetchMinute = async () => {
      try {
        const response = await fetch(`/api/getMinutes?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch minute');
        }
        const data = await response.json();
        if (data.minute) {
          setMinute(data.minute);
        } else {
          setMessage('No minutes available');
        }
      } catch (error) {
        console.error('Error fetching minute:', error);
        setMessage('Failed to fetch minute');
      }
    };

    if (id) {
      fetchMinute();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!minute) return;

    try {
      const response = await fetch('/api/editMinutes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: minute.id,
          title: minute.title,
          content: minute.content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update minute');
      }

      const result = await response.json();
      setMessage(result.message || 'Minute updated successfully');
    } catch (error) {
      console.error('Error updating minute:', error);
      setMessage('Failed to update minute');
    }
  };

  if (message) {
    return <p>{message}</p>;
  }

  if (!minute) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Minute</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={minute.title || ''}
          onChange={(e) => setMinute({ ...minute, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <label htmlFor="content">Content:</label>
        <Editor
          value={minute.content || ''}
          onChange={(content) => setMinute({ ...minute, content })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

const EditPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditMinute />
    </Suspense>
  );
};

export default EditPage;
