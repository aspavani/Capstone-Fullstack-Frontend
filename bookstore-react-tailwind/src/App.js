import React from 'react';
import './styles/tailwind.css'; // Import Tailwind CSS
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageBooksPage from './pages/ManageBooksPage';
import ManageAuthorsPage from './pages/ManageAuthorsPage';
import ManageGenresPage from './pages/ManageGenresPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthorProfilePage from './pages/AuthorProfilePage';
import AddBookPage from './pages/AddBookPage';
import AddAuthorPage from './pages/AddAuthorPage';
import AddGenrePage from './pages/AddGenrePage';

function App()  {
  return (
   
  <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/manage-books" element={<ManageBooksPage />} />
      <Route path="/manage-authors" element={<ManageAuthorsPage />} />
      <Route path="/manage-genres" element={<ManageGenresPage />} />
      <Route path="/edit-book/:id" element={<EditBookPage />} />
      <Route path="/book-details/:id" element={<BookDetailsPage />} />
      <Route path="/author-profile/:authorId" element={<AuthorProfilePage />} />
      <Route path="/add-book" element={<AddBookPage />} />
      <Route path="/add-author" element={<AddAuthorPage />} />
      <Route path="/add-genre" element={<AddGenrePage />} />
  </Routes>
);
}
export default App;
