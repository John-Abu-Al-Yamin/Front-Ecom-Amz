import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Api/AxiosInstance";
import { USER } from "../../Api/Api";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Get User
  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/${USER}/${id}`);
      console.log("User Data", response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
      navigate("/dashboard/users");

    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await axiosInstance.post(`/${USER}/edit/${id}`, {
        name,
        email,
        role,
      });
      console.log(response.data);
      setSubmitting(false);
      toast.success("User updated successfully");
      navigate("/dashboard/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response.data.message);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full">
      <form className="p-6" onSubmit={onSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Update User
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
              <option disabled value="">Select Role</option>
              <option value="1995">Admin</option>
              <option value="2001">User</option>
              <option value="1996">Writer</option>
            </select>
          )}
        </div>

        <div>
          <button
            disabled={submitting}
            type="submit"
            className="w-32 bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-300 flex justify-center items-center"
          >
            {submitting ? <FiLoader className="animate-spin" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
