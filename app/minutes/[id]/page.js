'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MinuteDetailPage = ({ params }) => {
  const { id } = params;
  const [minute, setMinute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMinute = async () => {
      try {
        const response = await fetch(`/api/getMinutes?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch minute details');
        }
        const data = await response.json();
        setMinute(data.minute);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMinute();
  }, [id]);

  if (loading) return <div className="text-center text-gray-500 py-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-6">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {minute ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{minute.title}</h1>
            <div className="text-gray-500 text-sm mb-4">
              <small>{new Date(minute.date).toLocaleDateString()}</small>
              <small className="ml-4">{new Date(minute.date).toLocaleTimeString()}</small>
            </div>
            <p className="text-gray-800">{minute.content}</p>
          </>
        ) : (
          <p className="text-center text-gray-500">Minute not found</p>
        )}
      </div>
    </div>
  );
};

export default MinuteDetailPage;
