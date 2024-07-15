import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ConfirmationModal from "../components/ConfirmationModal";
import FloatingAlert from "../components/FloatingAlert";
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline"; // Import PlusCircleIcon

const ManageAuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // success, error, or warning
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:5000/authors");
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-author/${id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedAuthorId(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/authors/${selectedAuthorId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setAlertMessage("Author deleted successfully!");
        setAlertType("success");
        setAuthors(
          authors.filter((author) => author.author_id !== selectedAuthorId)
        );
      } else {
        const data = await response.json();
        setAlertMessage(data.message || "Failed to delete author");
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("An error occurred while deleting the author");
      setAlertType("error");
    } finally {
      setIsModalOpen(false);
      // Wait for modal to close before showing the alert
      setTimeout(() => setAlertMessage(""), 3000); // Alert disappears after 3 seconds
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddAuthorClick = () => {
    navigate("/add-author"); // Redirect to the AddAuthorPage
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">Manage Authors</h1>
        <button
          onClick={handleAddAuthorClick}
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center space-x-2"
        >
          <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
          <span>Add Author</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authors.map((author) => (
          <div
            key={author.author_id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
          >
            <img
              src={author.imageUrl}
              alt={author.author_name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">
              {author.author_name}
            </h3>
            <p className="text-sm text-gray-700 mb-4">{author.biography}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(author.author_id)}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => handleDeleteClick(author.author_id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this author?"
      />

      {/* Display the FloatingAlert only if alertMessage is not empty */}
      {alertMessage && (
        <FloatingAlert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage("")}
        />
      )}
    </Layout>
  );
};

export default ManageAuthorsPage;
