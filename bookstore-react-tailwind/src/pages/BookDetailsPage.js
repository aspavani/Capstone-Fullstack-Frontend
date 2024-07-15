import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book ID from URL params
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/book/${id}`);
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-center text-gray-700">Loading...</div>;
  }

  if (!book) {
    return (
      <div className="p-4 text-center text-gray-700">
        No book details found.
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={"https://via.placeholder.com/300"} // Use the actual image URL or a placeholder
            alt={book.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">
              {book.title}
            </h1>
            <p className="text-base text-gray-700 mb-2">
              <strong>Author:</strong>{" "}
              <Link
                to={`/author-profile/${book.author_id}`} // Link to the author's profile page
                className="text-blue-500 hover:underline"
              >
                {book.author.author_name}
              </Link>
            </p>
            <p className="text-base text-gray-700 mb-2">
              <strong>Genre:</strong> {book.genre.genre_name}
            </p>
            <p className="text-base text-gray-700 mb-2">
              <strong>Publication Date:</strong>{" "}
              {new Date(book.publication_date).toLocaleDateString()}
            </p>
            <p className="text-base text-gray-700 mb-2">
              <strong>Price:</strong> ₹{book.price}
            </p>
            <p className="text-base text-gray-700 mb-4">
              <strong>Biography:</strong>{" "}
              {book.biography ||
                "This is a dummy biography of the book. It provides an overview of the book's background, plot, and significance. More detailed information can be included here to give readers a comprehensive understanding of the book."}
            </p>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetailsPage;
