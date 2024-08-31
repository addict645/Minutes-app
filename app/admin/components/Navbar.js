'use client';

import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

export default function Navbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/admin-signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is OK and handle JSON parsing
      if (response.ok) {
        const data = await response.json(); // Safely parse JSON
        if (data.success) {
          router.push('/admin/sign-in'); // Redirect to sign-in page
        } else {
          console.error('Sign-out error:', data.message);
        }
      } else {
        console.error('Sign-out failed with status:', response.status);
      }
    } catch (error) {
      console.error('Sign-out request failed:', error);
    }
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">Admin Dashboard</div>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
      >
        Sign Out
      </button>
    </nav>
  );
}
