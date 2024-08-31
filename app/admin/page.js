"use client"; // Ensure this component is a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth');
        const data = await response.json();
        if (!data.authenticated) {
          router.push('/admin/sign-in'); // Redirect to the correct sign-in page
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.push('/admin/sign-in'); // Redirect to the correct sign-in page on error
      } finally {
        setLoading(false); // Stop loading indicator once check is complete
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while checking auth
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Dashboard/>
      </div>
    </div>
  );
}
