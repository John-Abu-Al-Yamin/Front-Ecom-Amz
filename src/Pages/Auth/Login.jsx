import React, { useState } from "react";
import axiosInstance from "../../Api/AxiosInstance";
import { RiLoaderFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa"; // استيراد أيقونة Google
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookie from "cookie-universal";
import { LOGIN } from "../../Api/Api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookie();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/${LOGIN}`, form);
      const token = response.data.token;
      cookie.set("access_token", token);
      navigate("/users");
      toast.success("Login successful");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response.status === 401
          ? "Email or password is incorrect"
          : "Internal server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              min={6}
            />
          </div>

          <div className="mb-4">
            <a
              href={`http://127.0.0.1:8000/login-google`}
              target="_blank"
              className="flex items-center justify-center w-full py-2 text-center bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <FaGoogle className="mr-2 text-red-500" /> 
              <span>Login with Google</span>
            </a>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (
              <RiLoaderFill className="animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
