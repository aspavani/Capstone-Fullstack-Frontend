import React, { useEffect } from "react";

const FloatingAlert = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Alert disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-${
        type === "success" ? "green" : "red"
      }-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300 ${
        message ? "opacity-100" : "opacity-0"
      }`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default FloatingAlert;
