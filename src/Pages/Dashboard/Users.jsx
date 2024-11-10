import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/AxiosInstance";
import { USERS } from "../../Api/Api";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(`/${USERS}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = (userId) => {
    console.log("Deleting user with ID:", userId);
  };

  const handleUpdate = (userId) => {
    console.log("Updating user with ID:", userId);
  };

  return (
    <div className="overflow-x-auto p-6 mt-6 w-full">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Users List</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">ID</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Name</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Email</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Created At</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition-colors`}
            >
              <td className="px-6 py-4 text-sm text-gray-800 border-b">{user.id}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b flex justify-center space-x-2">
                <Link to={`/dashboard/users/${user.id}`}
                  onClick={() => handleUpdate(user.id)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  <FaEdit />
                  <span>Update</span>
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  <FaTrashAlt />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
