// src/pages/BookDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="md:w-1/3 mb-4 md:mb-0">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="md:w-2/3 md:pl-6">
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-2">Author: {book.author}</p>
        <p className="text-gray-700 mb-2">Genre: {book.genre}</p>
        <p className="text-gray-700 mb-2">Publication Date: {new Date(book.publicationDate).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-2">Price: ₹{book.price}</p>
        <p className="text-gray-700 mb-4">Biography: {book.biography || 'N/A'}</p>
        <p className="text-gray-700 mb-4">Additional Genre Information: {book.genreName || 'N/A'}</p>
      </div>
    </div>
  );
};

export default BookDetailsPage;
