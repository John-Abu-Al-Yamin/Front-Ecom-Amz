import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TableShow = ({ header, data, onDelete, currentUser }) => {
  // Ensure currentUser is defined and has a default value
  const safeCurrentUser = currentUser || {};

  // Define the table header
  const headerShow = [
    <th
      key="id"
      className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b"
    >
      ID
    </th>,
    ...header.map((item) => (
      <th
        key={item.key}
        className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b"
      >
        {item.name}
      </th>
    )),
  ];

  // Define the table rows
  const dataShow = data?.map((row) => (
    <tr key={row.id}>
      <td className="px-6 py-4 text-sm text-gray-700 border-b">{row.id}</td>
      {header?.map((col) => (
        <td key={col.key} className="px-6 py-4 text-sm text-gray-700 border-b">
          {/* Render the value in the appropriate way */}
          {col.key === "image" && <img src={row[col.key]} alt="" className="w-10 h-10"/>}
          {row[col.key] === "1995"
            ? "Admin"
            : row[col.key] === "2001"
            ? "User"
            : row[col.key] === "1996"
            ? "Writer"
            : row[col.key] === "1999"
            ? "Product Manager"
            : row[col.key]}
          {row[col.key] === safeCurrentUser.name && (
            <span className="font-bold text-blue-500"> (You)</span>
          )}
        </td>
      ))}
      <td className="px-6 py-4 text-center border-b flex gap-2 justify-center">
        {/* Edit button */}
        <Link
          to={`${row.id}`}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
        >
          <FaEdit /> Edit
        </Link>
        {/* Delete button */}
        {safeCurrentUser.name !== row.name && (
          <button
            onClick={() => onDelete(row.id)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 hover:scale-105 transition-transform duration-200"
          >
            <FaTrashAlt /> Delete
          </button>
        )}
      </td>
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            {headerShow}
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{dataShow}</tbody>
      </table>
    </div>
  );
};

export default TableShow;
