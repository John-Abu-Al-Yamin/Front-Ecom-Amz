import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/AxiosInstance";
import { USER } from "../../Api/Api";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/${USER}/add`, {
        name,
        email,
        password,
        role,
      });
      console.log(response.data);
      setLoading(false);
      toast.success("User updated successfully");
      navigate("/dashboard/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className="p-6" onSubmit={onSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Add User
        </h2>

        <div className="mb-4 w-2/4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          {loading ? (
            <div className="w-full px-4 py-4 bg-gray-300 rounded-md animate-pulse" />
          ) : (
            <input
              type="text"
              id="name"
              value={name}
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>

        <div className="mb-4 w-2/4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          {loading ? (
            <div className="w-full px-4 py-4 bg-gray-300 rounded-md animate-pulse" />
          ) : (
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </div>

        <div className="mb-4 w-2/4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          {loading ? (
            <div className="w-full px-4 py-4 bg-gray-300 rounded-md animate-pulse" />
          ) : (
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </div>

        <div className="mb-4 w-2/4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            Role
          </label>
          {loading ? (
            <div className="w-full px-4 py-4 bg-gray-300 rounded-md animate-pulse" />
          ) : (
            <select
              id="role"
              value={role}
              name="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setRole(e.target.value)}
            >
              <option disabled value="">
                Select Role
              </option>
              <option value="1995">Admin</option>
              <option value="1996">Writer</option>
              <option value="2001">User</option>
              <option value="1999">Product Manager</option>
            </select>
          )}
        </div>

        <div>
          <button
            disabled={
              name.length === 0 ||
              email.length === 0 ||
              password.length === 0 ||
              role.length === 0
            }
            type="submit"
            className={`w-32 font-medium py-2 rounded-md flex justify-center items-center transition duration-300 ${
              loading
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-600 text-white"
            } ${
              name.length === 0 ||
              email.length === 0 ||
              password.length === 0 ||
              role.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-400"
                : "bg-blue-500"
            }`}
          >
            {loading ? <FiLoader className="animate-spin" /> : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
