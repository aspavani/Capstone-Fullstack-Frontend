// src/components/Layout.js

import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UserGroupIcon, TagIcon } from '@heroicons/react/24/outline'; // Import icons

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
        <div className="text-center flex-1">
          <h1 className="text-xl font-semibold">Welcome to the Admin Dashboard</h1>
        </div>
        <div>
          {/* Add any icon here, e.g., a settings icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8.5a3.5 3.5 0 00-3.5 3.5 3.5 3.5 0 007 0A3.5 3.5 0 0012 8.5zM12 15a4.5 4.5 0 00-4.5 4.5A4.5 4.5 0 0012 24a4.5 4.5 0 004.5-4.5A4.5 4.5 0 0012 15z" />
          </svg>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4 flex-shrink-0">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="flex items-center text-gray-700 hover:text-blue-500">
                  <HomeIcon className="h-6 w-6 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/manage-books" className="flex items-center text-gray-700 hover:text-blue-500">
                  <BookOpenIcon className="h-6 w-6 mr-2" />
                  Manage Books
                </Link>
              </li>
              <li>
                <Link to="/manage-authors" className="flex items-center text-gray-700 hover:text-blue-500">
                  <UserGroupIcon className="h-6 w-6 mr-2" />
                  Manage Authors
                </Link>
              </li>
              <li>
                <Link to="/manage-genres" className="flex items-center text-gray-700 hover:text-blue-500">
                  <TagIcon className="h-6 w-6 mr-2" />
                  Manage Genres
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center w-full">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
