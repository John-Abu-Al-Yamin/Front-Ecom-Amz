import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/AxiosInstance";
import { CAT, Cat } from "../../Api/Api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableShow from "../../Components/Dashboard/TableShow";
import Skeleton from "../../Components/Dashboard/Skeleton"; // Skeleton component

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getUsers = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await axiosInstance.get(`/${CAT}`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      setLoading(false)
      await axiosInstance.delete(`/${Cat}/${userId}`);
      toast.success("Category deleted")
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Please try again later.");
    } finally {
      setLoading(true)
    }
  };

  const header = [
    { key: "title", name: "Title" },
    { key: "image", name: "Image" },
  ];

  // Render image function
  const renderImage = (imageUrl) => {
    return <img src={imageUrl} alt="Category" className="w-16 h-16 object-cover" />;
  };

  return (
    <div className="overflow-x-auto p-6 mt-6 w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Categories Page</h2>
        <Link to="/dashboard/category/add">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Add Category
          </button>
        </Link>
      </div>

      {loading ? (
        <table className="min-w-full bg-white">
          <tbody>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <TableShow header={header} data={categories} onDelete={handleDelete} renderImage={renderImage} />
      )}
    </div>
  );
};

export default Categories;
