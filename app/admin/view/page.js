'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminMinutesList from '../components/AdminMinutesList';

const AdminViewPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth');
        const data = await response.json();

        if (!data.authenticated) {
          router.push('/admin/signin'); // Redirect to sign-in page if not authenticated
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/admin/signin'); // Redirect on error
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin View Minutes</h1>
        <AdminMinutesList />
      </div>
    </div>
  );
};

export default AdminViewPage;
