// src/pages/ManageBooksPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('id'); // Default sort by ID
  const [sortDirection, setSortDirection] = useState('asc'); // Default ascending
  const itemsPerPage = 5; // Number of items per page
  const navigate = useNavigate();

  // Fetch the list of books from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/books/');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Toggle selection of a single book
  const handleCheckboxChange = (id) => {
    setSelectedBooks(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  // Handle delete of selected books
  const handleDeleteSelected = () => {
    if (window.confirm('Are you sure you want to delete the selected books?')) {
      const updatedBooks = books.filter(book => !selectedBooks.has(book.id));
      setBooks(updatedBooks);
      setSelectedBooks(new Set());
    }
  };

  // Placeholder functions for handling book actions
  const handleEditBook = (id) => {
    navigate(`/edit-book/${id}`);
  };

  // Dummy data
  const dummyData = Array.from({ length: 10 }, (_, index) => ({
    id: `dummy${index + 1}`,
    image: 'https://via.placeholder.com/50', // Placeholder image URL
    title: `Dummy Book ${index + 1}`,
    author: `Author ${index + 1}`,
    genre: `Genre ${index + 1}`,
    publicationDate: `2024-01-${index + 1}`,
    price: (index + 1) * 100
  }));

  // Sort data
  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Pagination logic
  const totalItems = books.length + dummyData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current page data
  const currentItems = sortData([
    ...dummyData,
    ...books
  ]).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Change page handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle column sort
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="flex">
      {/* Left Section with Nav */}
      <nav className="w-64 bg-gray-800 text-white min-h-screen p-4 space-y-4">
        <ul>
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">Home</Link>
          </li>
          <li>
            <Link to="/manage-books" className="block py-2 px-4 bg-gray-700 rounded">Manage Books</Link>
          </li>
          <li>
            <Link to="/manage-authors" className="block py-2 px-4 hover:bg-gray-700 rounded">Manage Authors</Link>
          </li>
          <li>
            <Link to="/manage-genres" className="block py-2 px-4 hover:bg-gray-700 rounded">Manage Genres</Link>
          </li>
        </ul>
      </nav>

      {/* Right Section with Book Table */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <button
            onClick={handleDeleteSelected}
            disabled={selectedBooks.size === 0}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Delete Selected
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedBooks.size === totalItems) {
                        setSelectedBooks(new Set());
                      } else {
                        setSelectedBooks(new Set([...dummyData.map(book => book.id), ...books.map(book => book.id)]));
                      }
                    }}
                    checked={selectedBooks.size === totalItems}
                  />
                </th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('id')}>
                  BookId
                  {sortKey === 'id' && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('title')}>
                  Title
                  {sortKey === 'title' && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('author')}>
                  Author
                  {sortKey === 'author' && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('genre')}>
                  Genre
                  {sortKey === 'genre' && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('publicationDate')}>
                  Publication Date
                  {sortKey === 'publicationDate' && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('price')}>
                  Price (₹)
                  {sortKey === 'price' && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(book => (
                <tr key={book.id}>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="checkbox"
                      checked={selectedBooks.has(book.id)}
                      onChange={() => handleCheckboxChange(book.id)}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{book.id}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{book.title}</td>
                  <td className="border border-gray-300 p-2">{book.author}</td>
                  <td className="border border-gray-300 p-2">{book.genre}</td>
                  <td className="border border-gray-300 p-2">{new Date(book.publicationDate).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">{book.price}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEditBook(book.id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteSelected(book.id)}
                      className="text-red-500 hover:text-red-700 mr-2"
                    >
                      <FaTrash size={20} />
                    </button>
                    <br />
                    <Link to={`/book-details/${book.id}`} className="text-blue-500 hover:underline">Show Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="mt-4 text-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Previous
          </button>
          <span className="mx-4">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageBooksPage;
