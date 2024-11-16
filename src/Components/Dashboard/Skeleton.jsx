import React from 'react';

const Skeleton = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4 text-sm border-b">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="px-6 py-4 text-sm border-b">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="px-6 py-4 text-sm border-b">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="px-6 py-4 text-sm border-b">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </td>
      <td className="px-6 py-4 text-sm border-b">
        <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </td>
    </tr>
  );
};

export default Skeleton;
