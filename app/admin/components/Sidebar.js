"use client"; // Client Component

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 text-xl font-bold">Admin Dashboard</div>
      <ul className="mt-6">
        <li>
          <a href="/admin" className="block p-4 hover:bg-gray-700">Dashboard</a>
        </li>
        <li>
          <a href="/admin/upload" className="block p-4 hover:bg-gray-700">Upload Minutes</a>
        </li>
        <li>
          <a href="/admin/view" className="block p-4 hover:bg-gray-700">View Minutes</a>
        </li>
        <li>
          <a href="/admin/create-client" className="block p-4 hover:bg-gray-700">Create User</a>
        </li>
        <li>
          <a href="/admin/clients" className="block p-4 hover:bg-gray-700">Manage Clients</a>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </div>
  );
}
