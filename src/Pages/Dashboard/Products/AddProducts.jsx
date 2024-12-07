import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Api/AxiosInstance";
import { PRO, Pro, CAT, Cat } from "../../../Api/Api";
import { FiLoader } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

const AddProducts = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [category, setCategory] = useState([]);
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const get_Categories = async () => {
      try {
        const response = await axiosInstance.get(`/${CAT}`);
        setCategory(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    get_Categories();
  }, []);

  const cateShow = () => {
    return category.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.title}
      </option>
    ));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category", form.category);
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("discount", form.discount);
    data.append("About", form.About);

    for (let i = 0; i < images.length; i++) {
      data.append("images[]", images[i]);
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/${Pro}/add`, data, {
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

  const imagesShow = images?.map((img, index) => (
    <img
      key={index}
      src={URL.createObjectURL(img)}
      alt={`Image ${index}`}
      className="w-20 h-20 object-cover rounded-md mr-2 "
    />
  ));

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
              select category
            </option>
            {cateShow()}
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
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-2"
          >
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
            name="About"
            value={form.About}
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
            multiple
            id="image"
            name="images"
            accept="images/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>

        {/* show images */}
        <div className="flex gap-2 items-center my-3">{imagesShow}</div>
        {/* Submit Button */}
        <div>
          <button
            disabled={!form.title || !form.category}
            type="submit"
            className={`w-32 font-medium py-2 rounded-md flex justify-center items-center transition duration-300 ${
              loading
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-600 text-white"
            } ${
              !form.title || !form.category
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
