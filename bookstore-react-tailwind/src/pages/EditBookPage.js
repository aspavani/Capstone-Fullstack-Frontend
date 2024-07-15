import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBooksPage = () => {
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author_id: '',
    genre_id: '',
    publication_date: '',
    price: '',
    image: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/book/${id}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBook(data);
        setFormData({
          title: data.title,
          author_id: data.author_id,
          genre_id: data.genre_id,
          publication_date: data.publication_date,
          price: data.price,
          image: null
        });
      } catch (error) {
        setError('Failed to fetch book details');
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:5000/authors');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        setError('Failed to fetch authors');
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:5000/genres');
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        setError('Failed to fetch genres');
      }
    };

    fetchBook();
    fetchAuthors();
    fetchGenres();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      
      const response = await fetch(`http://localhost:5000/book/${id}`, {
        method: 'PUT',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      navigate('/manage-books'); // Redirect to Manage Books page or wherever you prefer
    } catch (error) {
      setError('Failed to update book');
    }
  };

  if (!book || !authors.length || !genres.length) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Book</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-1">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author_id" className="block text-gray-700 text-sm font-semibold mb-1">Author:</label>
          <select
            id="author_id"
            name="author_id"
            value={formData.author_id}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Author</option>
            {authors.map(author => (
              <option key={author.author_id} value={author.author_id}>
                {author.author_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="genre_id" className="block text-gray-700 text-sm font-semibold mb-1">Genre:</label>
          <select
            id="genre_id"
            name="genre_id"
            value={formData.genre_id}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.genre_id} value={genre.genre_id}>
                {genre.genre_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="publication_date" className="block text-gray-700 text-sm font-semibold mb-1">Publication Date:</label>
          <input
            type="date"
            id="publication_date"
            name="publication_date"
            value={formData.publication_date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-semibold mb-1">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-semibold mb-1">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditBooksPage;
