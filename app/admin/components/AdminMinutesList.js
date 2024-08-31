'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminMinutesList = () => {
  const [minutes, setMinutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMinutes = async () => {
      try {
        const response = await fetch('/api/getMinutes');
        if (!response.ok) {
          throw new Error('Failed to fetch minutes');
        }
        const data = await response.json();
        if (data.minutes) {
          // Sort minutes by date in descending order
          const sortedMinutes = data.minutes
            .filter(minute => minute.date)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          setMinutes(sortedMinutes);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMinutes();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id); // Set the ID of the item being deleted
    try {
      const res = await fetch(`/api/deleteMinutes?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete minute');
      }
      setMinutes(minutes.filter((minute) => minute.id !== id));
      setDeletingId(null); // Clear the deleting ID
    } catch (err) {
      setError(err.message);
      setDeletingId(null); // Clear the deleting ID
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4">
      {minutes.length > 0 ? (
        <ul className="space-y-4">
          {minutes.map((minute) => (
            <li key={minute.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{minute.title}</h2>
                <small className="block mt-2 text-gray-500 text-sm">
                  {new Date(minute.date).toLocaleDateString()} {new Date(minute.date).toLocaleTimeString()}
                </small>
              </div>
              <div className="ml-4 flex space-x-2">
                <button
                  onClick={() => router.push(`/minutes/${minute.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/admin/edit?id=${minute.id}`)}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(minute.id)}
                  disabled={deletingId === minute.id} // Disable the button if deleting
                  className={`text-red-600 hover:underline ${deletingId === minute.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {deletingId === minute.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No minutes available.</p>
      )}
    </div>
  );
};

export default AdminMinutesList;
