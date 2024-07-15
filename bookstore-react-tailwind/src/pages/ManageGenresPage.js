import React, { useState, useEffect } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline"; // Import icons
import Layout from "../components/Layout"; // Import the Layout component
import FloatingAlert from "../components/FloatingAlert"; // Import the FloatingAlert component

const ManageGenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // 'success' or 'error'
  const [currentGenre, setCurrentGenre] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGenreName, setNewGenreName] = useState("");

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch("http://localhost:5000/genres");
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleEditClick = (genre) => {
    setCurrentGenre(genre);
    setIsEditing(true);
  };

  const handleDeleteClick = (genre) => {
    setCurrentGenre(genre);
    setShowDeleteConfirm(true);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const confirmDelete = async () => {
    if (!currentGenre) return;

    try {
      await fetch(`http://localhost:5000/genre/${currentGenre.genre_id}`, {
        method: "DELETE",
      });
      setAlertMessage("Genre deleted successfully!");
      setAlertType("success");
      setShowAlert(true);
      setShowDeleteConfirm(false);
      fetchGenres(); // Refresh the list
    } catch (error) {
      setAlertMessage("Error deleting genre.");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentGenre) return;

    try {
      await fetch(`http://localhost:5000/genre/${currentGenre.genre_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre_name: currentGenre.genre_name }),
      });
      setAlertMessage("Genre updated successfully!");
      setAlertType("success");
      setShowAlert(true);
      setIsEditing(false);
      fetchGenres(); // Refresh the list
    } catch (error) {
      setAlertMessage("Error updating genre.");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const handleAddGenre = async (e) => {
    e.preventDefault();
    if (!newGenreName) return;

    try {
      await fetch("http://localhost:5000/genre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre_name: newGenreName }),
      });
      setAlertMessage("Genre added successfully!");
      setAlertType("success");
      setShowAlert(true);
      setShowAddModal(false);
      setNewGenreName("");
      fetchGenres(); // Refresh the list
    } catch (error) {
      setAlertMessage("Error adding genre.");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowDeleteConfirm(false);
    setShowAddModal(false);
  };

  const handleChange = (e) => {
    setCurrentGenre({ ...currentGenre, genre_name: e.target.value });
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Manage Genres
        </h1>

        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 mb-4"
        >
          <PlusCircleIcon
            className="h-6 w-6 inline-block mr-2"
            aria-hidden="true"
          />
          Add Genre
        </button>

        {showAlert && (
          <FloatingAlert
            message={alertMessage}
            type={alertType}
            onClose={() => setShowAlert(false)}
          />
        )}

        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Genre Name</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.genre_id} className="border-b">
                <td className="p-4">{genre.genre_name}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(genre)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Edit Genre"
                  >
                    <PencilIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(genre)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete Genre"
                  >
                    <TrashIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Genre Modal */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Genre</h2>
              <form onSubmit={handleSave}>
                <div className="mb-4">
                  <label
                    htmlFor="genreName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Genre Name
                  </label>
                  <input
                    type="text"
                    id="genreName"
                    value={currentGenre.genre_name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Genre Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Add Genre</h2>
              <form onSubmit={handleAddGenre}>
                <div className="mb-4">
                  <label
                    htmlFor="newGenreName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Genre Name
                  </label>
                  <input
                    type="text"
                    id="newGenreName"
                    value={newGenreName}
                    onChange={(e) => setNewGenreName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete this genre?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageGenresPage;
