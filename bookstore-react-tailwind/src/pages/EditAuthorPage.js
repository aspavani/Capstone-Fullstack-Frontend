// src/pages/EditAuthorPage.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const EditAuthorPage = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [biography, setBiography] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/author/${id}`);
        const data = await response.json();
        setAuthor(data);
        setAuthorName(data.author_name);
        setBiography(data.biography);
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error fetching author details:", error);
      }
    };

    fetchAuthor();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    const updatedAuthor = {
      author_name: authorName,
      biography: biography,
      imageUrl: imageUrl,
    };

    try {
      const response = await fetch(`http://localhost:5000/author/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAuthor),
      });

      if (response.ok) {
        navigate("/manage-authors");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update author");
      }
    } catch (error) {
      setError("An error occurred while updating the author");
    }
  };

  const handleCancel = () => {
    navigate("/manage-authors");
  };

  if (!author) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Author</h1>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-6">{error}</div>
      )}

      <form
        onSubmit={handleSave}
        className="space-y-6 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div>
          <label
            htmlFor="authorName"
            className="block text-sm font-medium text-gray-700"
          >
            Author Name
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          />
        </div>

        <div>
          <label
            htmlFor="biography"
            className="block text-sm font-medium text-gray-700"
          >
            Biography
          </label>
          <textarea
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default EditAuthorPage;
