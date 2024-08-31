"use client"; // Ensure this component is a Client Component

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import UploadMinutesForm from '../components/UploadMinutesForm';

export default function UploadMinutesPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">
          <h1 className="text-3xl font-bold mb-6">Upload Meeting Minutes</h1>
          <UploadMinutesForm />
        </main>
      </div>
    </div>
  );
}
