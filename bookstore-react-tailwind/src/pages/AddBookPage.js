// AddBookPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [image, setImage] = useState(null);
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
        navigate('/manage-books');
      } else {
        console.error('Failed to add the book');
      }
    } catch (error) {
      console.error('Error adding the book:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Publication Date</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            required
            className="border p-2 w-full"
          >
            <option value="">Select Author</option>
            {authors.map(author => (
              <option key={author.author_id} value={author.author_id}>
                {author.author_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            required
            className="border p-2 w-full"
          >
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.genre_id} value={genre.genre_id}>
                {genre.genre_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookPage;
