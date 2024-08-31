'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MinutesList = ({ sortOption }) => {
  const [minutes, setMinutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMinutes = async () => {
      try {
        const response = await fetch(`/api/getMinutes?_=${new Date().getTime()}&sort=${sortOption}`);
        if (!response.ok) {
          throw new Error('Failed to fetch minutes');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging line

        if (data && Array.isArray(data.minutes)) {
          const sortedMinutes = data.minutes
            .filter(minute => minute.date) // Ensure each minute has a date
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Default to descending order
          setMinutes(sortedMinutes);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMinutes();
  }, [sortOption]); // Fetch minutes whenever the sortOption changes

  const handleViewClick = (id) => {
    router.push(`/minutes/${id}`); // Navigate to the detailed view page
  };

  if (loading) return <div className="text-center text-gray-500 py-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-6">Error: {error}</div>;

  return (
    <div className="space-y-6">
      {minutes.length > 0 ? (
        <ul className="space-y-6">
          {minutes.map((minute) => (
            <li key={minute.id} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{minute.title}</h2>
              <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                <small>{new Date(minute.date).toLocaleDateString()}</small>
                <small>{new Date(minute.date).toLocaleTimeString()}</small>
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
  );
};

export default MinutesList;
