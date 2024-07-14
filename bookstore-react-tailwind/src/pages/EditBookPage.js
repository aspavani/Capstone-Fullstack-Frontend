// src/pages/EditBookPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    price: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('EditBookPage loaded with ID:', id);
    const fetchBook = async () => {
      try {
        // Simulating fetch with dummy data
        const dummyBook = {
          title: 'Sample Book Title',
          author: 'Sample Author',
          genre: 'Sample Genre',
          publicationDate: '2023-01-01',
          price: 500,
          image: 'https://via.placeholder.com/150'
        };
        setBook(dummyBook);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);
    formData.append('publicationDate', book.publicationDate);
    formData.append('price', book.price);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await fetch(`http://localhost:5000/book/${id}`, {
        method: 'PUT',
        body: formData
      });
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={book.title || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="author" className="mb-2 font-medium">Author:</label>
          <input
            id="author"
            type="text"
            name="author"
            value={book.author || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="genre" className="mb-2 font-medium">Genre:</label>
          <input
            id="genre"
            type="text"
            name="genre"
            value={book.genre || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="publicationDate" className="mb-2 font-medium">Publication Date:</label>
          <input
            id="publicationDate"
            type="date"
            name="publicationDate"
            value={book.publicationDate || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-medium">Price (₹):</label>
          <input
            id="price"
            type="number"
            name="price"
            value={book.price || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-medium">Image:</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="border border-gray-300 rounded-md p-2"
          />
          {book.image && (
            <div className="mt-2">
              <img src={book.image} alt="Book Thumbnail" className="w-32 h-auto rounded-md" />
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookPage;
