import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGenrePage = () => {
  const [genreName, setGenreName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genre_name: genreName }),
      });

      if (response.ok) {
        setSuccessMessage('Genre added successfully!');
        setTimeout(() => navigate('/add-book'), 2000); // Redirect after 2 seconds
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add the genre');
      }
    } catch (error) {
      setError('An error occurred while adding the genre');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add New Genre</h1>

        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-6">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="genreName" className="block text-sm font-medium text-gray-700">Genre Name</label>
            <input
              type="text"
              id="genreName"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Genre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGenrePage;
