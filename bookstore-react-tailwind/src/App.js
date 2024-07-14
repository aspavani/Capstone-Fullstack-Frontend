import React from 'react';
import './styles/tailwind.css'; // Import Tailwind CSS
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManageBooksPage from './pages/ManageBooksPage';
import ManageAuthorsPage from './pages/ManageAuthorsPage';
import ManageGenresPage from './pages/ManageGenresPage';
import EditBookPage from './pages/EditBookPage';

function App()  {
  return (
   
  <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/manage-books" element={<ManageBooksPage />} />
      <Route path="/manage-authors" element={<ManageAuthorsPage />} />
      <Route path="/manage-genres" element={<ManageGenresPage />} />
      <Route path="/edit-book/:id" element={<EditBookPage />} />
  </Routes>
);
}
export default App;
