import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const AuthorProfilePage = () => {
  const { authorId } = useParams(); // Get the author ID from URL params
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/author/${authorId}`
        );
        const data = await response.json();
        setAuthor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author details:", error);
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [authorId]);

  if (loading) {
    return <div className="p-4 text-center text-gray-700">Loading...</div>;
  }

  if (!author) {
    return (
      <div className="p-4 text-center text-gray-700">
        No author details found.
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
          <img
            src="https://via.placeholder.com/150" // Placeholder image
            alt={author.author_name}
            className="w-40 h-40 object-cover rounded-full border-2 border-gray-200 shadow-md"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">
            {author.name}
          </h1>
          <p className="text-base text-gray-700 mb-4">
            <strong>Biography:</strong>{" "}
            {author.biography || "This author biography is not available."}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Date of Birth:</strong> {author.date_of_birth}
          </p>
          {/* Add more fields as necessary */}
          <div className="text-center md:text-left mt-6">
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Back to Books
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorProfilePage;
