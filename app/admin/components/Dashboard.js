'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalMinutes = async () => {
      try {
        const response = await fetch('/api/getMinutes');
        if (!response.ok) {
          throw new Error('Failed to fetch minutes');
        }
        const data = await response.json();
        setTotalMinutes(data.minutes.length); // Assuming data.minutes is an array of minutes
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalMinutes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <nav className="mb-6">
        <ul className="space-y-2">
        
        </ul>
      </nav>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Total Minutes Uploaded</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <p className="text-2xl font-bold">{totalMinutes}</p>
        )}
      </div>
    </div>
  );
}
