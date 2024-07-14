import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons

const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('id'); // Default sort by ID
  const [sortDirection, setSortDirection] = useState('asc'); // Default ascending
  const itemsPerPage = 5; // Number of items per page

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
    console.log('Edit book with id:', id);
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
    <div>
      {/* Header */}
      <header>
        <h1>Manage Books</h1>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {/* Left Section with Links */}
        <nav style={{ width: '200px', borderRight: '1px solid black' }}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/manage-authors">Manage Authors</Link></li>
            <li><Link to="/manage-genres">Manage Genres</Link></li>
          </ul>
        </nav>

        {/* Right Section with Book Table */}
        <div style={{ flex: 1, padding: '0 20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <button onClick={handleDeleteSelected} disabled={selectedBooks.size === 0}>
              Delete Selected
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>
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
                  <th style={{ border: '1px solid black', padding: '8px' }} onClick={() => handleSort('id')}>
                    BookId
                    {sortKey === 'id' && (
                      <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Image</th>
                  <th style={{ border: '1px solid black', padding: '8px' }} onClick={() => handleSort('title')}>
                    Title
                    {sortKey === 'title' && (
                      <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </th>
                  <th style={{ border: '1px solid black', padding: '8px' }} onClick={() => handleSort('author')}>
                    Author
                    {sortKey === 'author' && (
                      <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </th>
                  <th style={{ border: '1px solid black', padding: '8px' }} onClick={() => handleSort('genre')}>
                    Genre
                    {sortKey === 'genre' && (
                      <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </th>
                  <th style={{ border: '1px solid black', padding: '8px' }} onClick={() => handleSort('publicationDate')}>
                    Publication Date
                    {sortKey === 'publicationDate' && (
                      <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </th>
                  <th style={{ border: '1px solid black', padding: '8px' }} onClick={() => handleSort('price')}>
                    Price (₹)
                    {sortKey === 'price' && (
                      <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Display Data with Pagination */}
                {currentItems.map(book => (
                  <tr key={book.id}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <input
                        type="checkbox"
                        checked={selectedBooks.has(book.id)}
                        onChange={() => handleCheckboxChange(book.id)}
                      />
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{book.id}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <img
                        src={book.image}
                        alt={book.title}
                        style={{ width: '50px', height: 'auto' }}
                      />
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{book.title}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{book.author}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{book.genre}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(book.publicationDate).toLocaleDateString()}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{book.price}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <button
                        onClick={() => handleEditBook(book.id)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteSelected(book.id)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <FaTrash size={20} />
                      </button>
                      <br />
                      <Link to="/">Show Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooksPage;
