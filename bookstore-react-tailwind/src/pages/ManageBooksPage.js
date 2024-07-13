import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(new Set());

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
  const dummyData = [
    {
      id: 'dummy1',
      image: 'https://via.placeholder.com/50', // Placeholder image URL
      title: 'Dummy Book 1',
      author: 'Author 1',
      genre: 'Genre 1',
      publicationDate: '2024-01-01',
      price: 100
    },
    {
      id: 'dummy2',
      image: 'https://via.placeholder.com/50', // Placeholder image URL
      title: 'Dummy Book 2',
      author: 'Author 2',
      genre: 'Genre 2',
      publicationDate: '2024-01-02',
      price: 200
    }
  ];

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
                        if (selectedBooks.size === books.length + 2) {
                          setSelectedBooks(new Set());
                        } else {
                          setSelectedBooks(new Set([...books.map(book => book.id), 'dummy1', 'dummy2']));
                        }
                      }}
                      checked={selectedBooks.size === books.length + 2}
                    />
                  </th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>BookId</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Image</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Author</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Genre</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Publication Date</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Price (₹)</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Dummy Rows */}
                {dummyData.map(book => (
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
                      <button onClick={() => handleEditBook(book.id)} style={{ marginRight: '8px' }}>Edit</button>
                      <button onClick={() => handleDeleteSelected(book.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {/* Actual Rows */}
                {books.map(book => (
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
                      <button onClick={() => handleEditBook(book.id)} style={{ marginRight: '8px' }}>Edit</button>
                      <button onClick={() => handleDeleteSelected(book.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooksPage;
