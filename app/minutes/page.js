'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Filter from './components/Filter';
import MinutesList from './components/MinutesList';

const MinutesPage = () => {
  const [minutes, setMinutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMinutes = async () => {
      try {
        const response = await fetch('/api/getMinutes');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.minutes) {
          // Sort minutes by date in descending order
          const sortedMinutes = data.minutes
            .filter(minute => minute.date) // Ensure date exists
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort in descending order
          setMinutes(sortedMinutes);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMinutes();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const handleViewClick = (id) => {
    router.push(`/minutes/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Header />
      <Filter />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meeting Minutes</h1>
        {minutes.length > 0 ? (
          <ul className="space-y-4">
            {minutes.map((minute) => (
              <li key={minute.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{minute.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {new Date(minute.date).toLocaleDateString()} {new Date(minute.date).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => handleViewClick(minute.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No minutes available</p>
        )}
      </div>
    </div>
  );
};

export default MinutesPage;
