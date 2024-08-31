export default function LandingPage() {
  return (
    <div>
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">MinutesApp</div>
          <nav className="space-x-4">
            <a href="/admin/sign-in" className="hover:text-gray-300">Upload Minutes</a>
            <a href="/minutes/sign-in" className="hover:text-gray-300">View Minutes</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 text-center py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Store and Manage Your Meeting Minutes Securely
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Easily upload, organize, and access all your important meeting documents in one place.
        </p>
        <a 
          href="/admin/sign-in"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500"
        >
          Upload Minutes
        </a>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 16l4-4-4-4m4 4h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure File Uploads</h3>
            <p className="text-gray-600">Your files are safe and accessible anytime.</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 9v10M8 9v10M12 5v14m8-14v14M4 5v14m4-10h8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Organized Dashboard</h3>
            <p className="text-gray-600">All your minutes in one organized place.</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 12h7M8 12H1m0 0v10a2 2 0 002 2h18a2 2 0 002-2V12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 7a4 4 0 00-8 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Role-Based Access</h3>
            <p className="text-gray-600">Admin users can upload and manage minutes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 MinutesApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
