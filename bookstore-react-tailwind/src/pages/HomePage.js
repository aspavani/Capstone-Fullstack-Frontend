// src/pages/HomePage.js

import React from "react";
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <section className="flex flex-col lg:flex-row items-center justify-between my-10">
        {/* Description */}
        <div className="lg:w-1/2 p-6 lg:pl-12 lg:pr-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Welcome to the Admin Dashboard
          </h2>
          <p className="text-lg text-gray-600">
            We're excited to have you here! This dashboard is your gateway to
            managing all aspects of your book collection, including adding and
            organizing books, authors, and genres. Use the sidebar to navigate
            through different sections and make updates as needed. We hope you
            find this tool useful and intuitive for managing your literary
            inventory.
          </p>
        </div>

        {/* Hero Image */}
        <div className="lg:w-1/2 p-6 lg:pr-12 lg:pl-6 flex justify-center">
          <img
            src="Main_Image.jpg"
            alt="Admin Dashboard Hero"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
