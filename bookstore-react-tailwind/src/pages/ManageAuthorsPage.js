// src/pages/ManageAuthors.js

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout"; // Import Layout component
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // Import icons

const ManageAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Fetch authors from the API
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:5000/authors");
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Manage Authors
      </h1>

      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {authors.map((author) => (
          <div
            key={author.author_id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={author.imageUrl}
              alt={author.author_name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {author.author_name}
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              {author.biography}
            </p>
            <div className="flex space-x-2">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                aria-label="Edit Author"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                aria-label="Delete Author"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ManageAuthors;
