'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/client-signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push('/minutes/sign-in'); // Redirect to client sign-in page
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
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <Link href="/" className="text-xl font-bold hover:underline" aria-label="Go to home page">
          MinutesApp
        </Link>
        <nav className="flex flex-wrap items-center">
          <Link href="/admin/view" className="mr-4 text-lg hover:underline" aria-label="Go to admin dashboard">
            Admin Dashboard
          </Link>
          <Link href="/minutes" className="mr-4 text-lg hover:underline" aria-label="View meeting minutes">
            Minutes
          </Link>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors"
            aria-label="Sign out"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
