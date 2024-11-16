import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/AxiosInstance";
import { CAT ,Cat} from "../../Api/Api";
import { FiLoader } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
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
      toast.success("Category added successfully");
      navigate("/dashboard/categories");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Error adding category");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className="p-6" onSubmit={onSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Add Category
        </h2>

        <div className="mb-4 w-2/4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          {loading ? (
            <div className="w-full px-4 py-4 bg-gray-300 rounded-md animate-pulse" />
          ) : (
            <input
              type="text"
              id="title"
              value={title}
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </div>

        {/* Image Input */}
        <div className="mb-4 w-2/4">
          <label
            htmlFor="image"
            className=" text-gray-700 font-medium mb-2 flex items-center gap-2"
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

        <div>
          
        <button
            disabled={
              title.length < 1 || image === null
            }
            type="submit"
            className={`w-32 font-medium py-2 rounded-md flex justify-center items-center transition duration-300 ${
              loading
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-600 text-white"
            } ${
              title.length < 1 || image === null
                ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-400"
                : "bg-blue-500"
            }`}
          >
            {loading ? <FiLoader className="animate-spin" /> : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
