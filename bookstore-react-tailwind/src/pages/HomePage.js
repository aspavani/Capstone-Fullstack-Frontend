// src/pages/HomePage.js

import React from 'react';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <p className="text-gray-700 text-lg">
        Welcome to the Admin Dashboard! Here you can manage your books, authors, and genres efficiently. Use the sidebar to navigate through different sections and make updates as needed.
      </p>
    </Layout>
  );
};

export default HomePage;
