import React from "react";
import "./styles/tailwind.css"; // Import Tailwind CSS
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManageBooksPage from "./pages/ManageBooksPage";
import ManageAuthorsPage from "./pages/ManageAuthorsPage";
import ManageGenresPage from "./pages/ManageGenresPage";
import EditBookPage from "./pages/EditBookPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import AuthorProfilePage from "./pages/AuthorProfilePage";
import AddBookPage from "./pages/AddBookPage";
import AddAuthorPage from "./pages/AddAuthorPage";
import AddGenrePage from "./pages/AddGenrePage";
import EditAuthorPage from "./pages/EditAuthorPage";
import { useNavigate } from "react-router-dom";

// const PageNotFound = () => {
//   return (
//     <>
//       <h1> 404 - Page Not Found</h1>
//       <p>Sorry, the page you are looking for could not be found.</p>
//     </>
//   );
// };

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-12 rounded-lg shadow-lg max-w-xl w-full">
        <img
          src="/404.png"
          alt="404 Not Found"
          className="mx-auto mb-8 max-w-lg"
        />
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Click
          below to return to the home page.
        </p>
        <button
          onClick={handleHomeClick}
          className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

function App() {
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
      <Route path="/edit-author/:id" element={<EditAuthorPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
export default App;
