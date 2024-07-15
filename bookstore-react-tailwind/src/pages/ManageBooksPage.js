import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../components/Layout";

// Modal Component
const Modal = ({ isOpen, onClose, onConfirm, bookId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this book?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(bookId)}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("book_id"); // Default sort by book_id
  const [sortDirection, setSortDirection] = useState("asc"); // Default ascending
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [bookToDelete, setBookToDelete] = useState(null); // Book ID for deletion confirmation
  const itemsPerPage = 5; // Number of items per page
  const navigate = useNavigate();

  // Fetch the list of books from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Toggle selection of a single book
  const handleCheckboxChange = (id) => {
    setSelectedBooks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  // Handle delete of a single book
  const handleDeleteBook = (id) => {
    setBookToDelete(id);
    setIsModalOpen(true);
  };

  // Handle delete of selected books
  const handleDeleteSelected = async () => {
    if (window.confirm("Are you sure you want to delete the selected books?")) {
      try {
        await Promise.all(
          Array.from(selectedBooks).map((id) =>
            fetch(`http://localhost:5000/book/${id}`, {
              method: "DELETE",
            })
          )
        );

        // Remove deleted books from the list
        const updatedBooks = books.filter(
          (book) => !selectedBooks.has(book.book_id)
        );
        setBooks(updatedBooks);
        setSelectedBooks(new Set());
        setSuccessMessage("Selected books deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      } catch (error) {
        console.error("Error deleting selected books:", error);
      }
    }
  };

  // Confirm delete of a book
  const handleConfirmDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/book/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted book from the list
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.book_id !== id)
        );
        setSuccessMessage("Book deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      } else {
        console.error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setIsModalOpen(false);
      setBookToDelete(null);
    }
  };

  // Handle edit of a book
  const handleEditBook = (id) => {
    navigate(`/edit-book/${id}`);
  };

  // Filtered and sorted data
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      //return sortDirection === 'asc' ? 1 : -1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Pagination logic
  const totalItems = filteredBooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page data
  const currentItems = sortData(filteredBooks).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle column sort
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <Layout>
      <div className="flex">
        {/* Left Section with Nav */}
        <nav className="w-64 bg-gray-800 text-white min-h-screen p-4 space-y-4">
          <ul>
            <li>
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/manage-books"
                className="block py-2 px-4 bg-gray-700 rounded"
              >
                Manage Books
              </Link>
            </li>
            <li>
              <Link
                to="/manage-authors"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Manage Authors
              </Link>
            </li>
            <li>
              <Link
                to="/manage-genres"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Manage Genres
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Section with Book Table */}
        <div className="flex-1 p-4">
          {successMessage && (
            <div className="bg-green-500 text-white p-4 rounded-md mb-4 shadow-md">
              {successMessage}
            </div>
          )}

          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <Link
              to="/add-book" // Route to AddBookPage
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add New Book
            </Link>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 md:mt-0 md:ml-4 p-2 border rounded"
            />
          </div>
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
                          setSelectedBooks(
                            new Set(filteredBooks.map((book) => book.book_id))
                          );
                        }
                      }}
                      checked={selectedBooks.size === totalItems}
                    />
                  </th>
                  <th
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleSort("book_id")}
                  >
                    Book ID
                    {sortKey === "book_id" && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th className="border border-gray-300 p-2">Image</th>
                  <th
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Title
                    {sortKey === "title" && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleSort("author")}
                  >
                    Author
                    {sortKey === "author" && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleSort("genre")}
                  >
                    Genre
                    {sortKey === "genre" && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleSort("publication_date")}
                  >
                    Publication Date
                    {sortKey === "publication_date" && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    Price (₹)
                    {sortKey === "price" && (
                      <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((book) => (
                  <tr key={book.book_id}>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        checked={selectedBooks.has(book.book_id)}
                        onChange={() => handleCheckboxChange(book.book_id)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {book.book_id}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <img
                        src={book.image || "https://via.placeholder.com/50"} // Use actual book image if available
                        alt={book.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{book.title}</td>
                    <td className="border border-gray-300 p-2">
                      <Link
                        to={`/author-profile/${book.author.author_id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {book.author.author_name}
                      </Link>
                    </td>
                    <td className="border border-gray-300 p-2">
                      {book.genre.genre_name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {new Date(book.publication_date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2">{book.price}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleEditBook(book.book_id)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.book_id)}
                        className="text-red-500 hover:text-red-700 mr-2"
                      >
                        <FaTrash size={20} />
                      </button>
                      <br />
                      <Link
                        to={`/book-details/${book.book_id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Show Details
                      </Link>
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
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          bookId={bookToDelete}
        />
      </div>
    </Layout>
  );
};

export default ManageBooksPage;
