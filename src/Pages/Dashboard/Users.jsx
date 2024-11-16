import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/AxiosInstance";
import { USERS, USER } from "../../Api/Api";
import { Link } from "react-router-dom";
import Skeleton from "../../Components/Dashboard/Skeleton"; // Skeleton component
import { toast } from "react-toastify";
import TableShow from "../../Components/Dashboard/TableShow";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [currentUser, setCurrentUser] = useState("");

  const getUsers = async () => {
    setLoading(true); // Ensure loading is set to true at the beginning of the fetch
    try {
      const response = await axiosInstance.get(`/${USERS}`);
      setUsers(response.data);
    } catch (error) {
      toast.error("Error fetching users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axiosInstance.get(`/${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  useEffect(() => {
    if (currentUser) {
      getUsers();
    }
  }, [currentUser]);

  const handleDelete = async (userId) => {
    if (currentUser.id !== userId) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/${USER}/${userId}`);
        toast.success("User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        toast.error("Error deleting user. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You cannot delete yourself.");
    }
  };

  const userFilter =
    currentUser && currentUser.id
      ? users.filter((user) => user.id !== currentUser.id)
      : users;

  const header = [
    { key: "name", name: "UserName" },
    { key: "email", name: "Email" },
    { key: "role", name: "Role" },
  ];

  return (
    <div className="overflow-x-auto p-6 mt-6 w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Users Page</h2>
        <Link to="/dashboard/user/add">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Add User
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
        <TableShow
          header={header}
          data={users}
          onDelete={handleDelete}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Users;
