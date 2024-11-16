import React from 'react';

const Err403 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Access Forbidden</h2>
        <p className="text-gray-500 mt-2">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default Err403;
