import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Cat } from "../../Api/Api";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/AxiosInstance";
import { FiLoader } from "react-icons/fi";
import { FaImage } from "react-icons/fa";

const UpdateCategory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const navigate = useNavigate();

  // Fetch the category details
  const getCategory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/${Cat}/${id}`);
      setTitle(response.data.title);
      setPreview(response.data.image); // Assuming API returns the image URL
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Error fetching category. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  // Update category
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      const response = await axiosInstance.post(
        `/${Cat}/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Category updated successfully");
      navigate("/dashboard/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(error.response?.data?.message || "Error updating category.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-full">
      <form className="p-6" onSubmit={onSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Update Category
        </h2>

        {/* Title Input */}
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
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            disabled={loading || title.length < 1}
            type="submit"
            className={`w-32 font-medium py-2 rounded-md flex justify-center items-center transition duration-300 ${
              loading
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-600 text-white"
            } ${
              title.length < 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500"
            }`}
          >
            {loading ? (
              <FiLoader className="animate-spin" />
            ) : (
              "Update Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
