// src/pages/BookDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Uncomment this line when you have a real API endpoint
        // const response = await fetch(`http://localhost:5000/books/${id}`);
        // const data = await response.json();

        // Dummy data for now
        const dummyData = {
          id,
          image: 'https://via.placeholder.com/150', // Placeholder image URL
          title: `Dummy Book ${id}`,
          author: `Author ${id}`,
          genre: `Genre ${id}`,
          publicationDate: `2024-01-${id}`,
          price: id.length * 100, // Just a mock price
          biography: 'This is a dummy biography for the book. It includes more content to make it a paragraph with several sentences. The aim is to provide a more realistic example for the page layout. Feel free to adjust or replace this with actual book details as needed.',
          genreName: 'Fiction', // Placeholder for genre name
        };

        setBook(dummyData);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="md:w-1/3 mb-6 md:mb-0">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="md:w-2/3 md:pl-8">
        <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
        <p className="text-gray-700 text-lg mb-2">
          Author: 
          <Link 
            to="/manage-authors" 
            className="text-blue-500 hover:underline ml-1"
          >
            {book.author}
          </Link>
        </p>
        <p className="text-gray-700 text-lg mb-2">
          Genre: <span className="font-semibold">{book.genre}</span>
        </p>
        <p className="text-gray-700 text-lg mb-2">
          Publication Date: <span className="font-semibold">{new Date(book.publicationDate).toLocaleDateString()}</span>
        </p>
        <p className="text-gray-700 text-lg mb-2">
          Price: <span className="font-semibold">₹{book.price}</span>
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Biography: <span className="block">{book.biography}</span>
        </p>
        <p className="text-gray-700 text-lg">
          Additional Genre Information: <span className="font-semibold">{book.genreName}</span>
        </p>
      </div>
    </div>
  );
};

export default BookDetailsPage;
