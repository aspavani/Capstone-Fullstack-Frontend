import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline"; // Import PhotoIcon for image upload
import Layout from "../components/Layout";

const AddAuthorPage = () => {
  const [authorName, setAuthorName] = useState("");
  const [biography, setBiography] = useState("");
  const [authorImage, setAuthorImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the redirect parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get("redirect") || "/manage-authors"; // Default to /manage-authors if not specified

  const handleImageChange = (e) => {
    setAuthorImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("author_name", authorName);
    formData.append("biography", biography);
    formData.append("image", authorImage);

    try {
      const response = await fetch("http://localhost:5000/author", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Author added successfully!");
        setTimeout(() => navigate(redirectUrl), 2000); // Redirect after 2 seconds to the URL specified
      } else {
        const data = await response.json();
        setError(data.message || "Failed to add the author");
      }
    } catch (error) {
      setError("An error occurred while adding the author");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">
            Add New Author
          </h1>

          {successMessage && (
            <div className="bg-green-500 text-white p-4 rounded-md mb-6">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                htmlFor="authorImage"
                className="block text-sm font-medium text-gray-700"
              >
                Author Image
              </label>
              <input
                type="file"
                id="authorImage"
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
              <div className="flex items-center mt-2">
                <PhotoIcon
                  className="h-6 w-6 text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Upload an image for the author
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Author
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddAuthorPage;
