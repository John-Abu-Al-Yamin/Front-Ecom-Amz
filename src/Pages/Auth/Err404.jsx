import React from 'react';
import { motion } from 'framer-motion';

const Err404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl mt-4 font-semibold text-gray-700">Page Not Found</p>
        <p className="text-gray-500 mt-2">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <motion.a
          href="/"
          whileHover={{ scale: 1.1 }}
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
        >
          Go Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Err404;
