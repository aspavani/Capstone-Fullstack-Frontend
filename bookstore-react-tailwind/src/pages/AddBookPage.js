import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline'; // Import the PlusCircleIcon

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch authors and genres
    const fetchOptions = async () => {
      try {
        const [authorsRes, genresRes] = await Promise.all([
          fetch('http://localhost:5000/authors'),
          fetch('http://localhost:5000/genres'),
        ]);
        const [authorsData, genresData] = await Promise.all([
          authorsRes.json(),
          genresRes.json(),
        ]);
        setAuthors(authorsData);
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching authors or genres:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('publication_date', publicationDate);
    formData.append('author_id', selectedAuthor);
    formData.append('genre_id', selectedGenre);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/book', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Book added successfully!');
        setTimeout(() => navigate('/manage-books'), 2000); // Redirect after 2 seconds
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add the book');
      }
    } catch (error) {
      setError('An error occurred while adding the book');
    }
  };

  // Handle the cancel button click
  const handleCancel = () => {
    navigate('/manage-books');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add New Book</h1>

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
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
            />
          </div>

          <div>
            <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700">Publication Date</label>
            <input
              type="date"
              id="publicationDate"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
            <div className="flex items-center space-x-4">
              <select
                id="author"
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
              >
                <option value="">Select Author</option>
                {authors.map(author => (
                  <option key={author.author_id} value={author.author_id}>
                    {author.author_name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => navigate('/add-author')}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
            <div className="flex items-center space-x-4">
              <select
                id="genre"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
              >
                <option value="">Select Genre</option>
                {genres.map(genre => (
                  <option key={genre.genre_id} value={genre.genre_id}>
                    {genre.genre_name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => navigate('/add-genre')}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
