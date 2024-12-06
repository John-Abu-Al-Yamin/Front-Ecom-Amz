import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Api/AxiosInstance";
import { CAT, Cat } from "../../../Api/Api";
import { FiLoader } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

const AddProducts = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    about: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories for the dropdown
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(`/${CAT}`);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("form", JSON.stringify(form));
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/${Cat}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setLoading(false);
      toast.success("Product added successfully");
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Error adding product");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className="p-6" onSubmit={onSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Add Product
        </h2>

        {/* Category Select */}
        <div className="mb-4 w-2/4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title Input */}
        <div className="mb-4 w-2/4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter the product title"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4 w-2/4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter the product description"
            rows="4"
          />
        </div>

        {/* Price Input */}
        <div className="mb-4 w-2/4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter the product price"
          />
        </div>

        {/* Discount Input */}
        <div className="mb-4 w-2/4">
          <label
            htmlFor="discount"
            className="block text-gray-700 font-medium mb-2"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter the discount"
          />
        </div>

        {/* About Input */}
        <div className="mb-4 w-2/4">
          <label
            htmlFor="about"
            className="block text-gray-700 font-medium mb-2"
          >
            About
          </label>
          <textarea
            id="about"
            name="about"
            value={form.about}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Write about the product"
            rows="4"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4 w-2/4">
          <label
            htmlFor="image"
            className="text-gray-700 font-medium mb-2 flex items-center gap-2"
          >
            <FaImage className="text-blue-500" />
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            accept="image/*"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={!form.title || !form.category || !image}
            type="submit"
            className={`w-32 font-medium py-2 rounded-md flex justify-center items-center transition duration-300 ${
              loading
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-600 text-white"
            } ${
              !form.title || !form.category || !image
                ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-400"
                : "bg-blue-500"
            }`}
          >
            {loading ? <FiLoader className="animate-spin" /> : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
