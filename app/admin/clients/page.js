// app/admin/clients/page.js
'use client';

import { useEffect, useState } from 'react';

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        const data = await response.json();
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          setMessage('Failed to load clients.');
        }
      } catch (error) {
        setMessage('An error occurred while fetching clients.');
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await fetch(`/api/clients/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        if (data.success) {
          setClients(clients.filter(client => client.id !== id));
          setMessage('Client deleted successfully.');
        } else {
          setMessage(data.message || 'Failed to delete client.');
        }
      } catch (error) {
        setMessage('An error occurred while deleting the client.');
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Manage Clients</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-3 text-center">No clients found</td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id}>
                <td className="p-3 border-b">{client.id}</td>
                <td className="p-3 border-b">{client.email}</td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
