import React, { useEffect } from "react";
import axiosInstance from "../../Api/AxiosInstance";
import Logout from "../Auth/Logout";
import { USERS } from "../../Api/Api";

const Users = () => {
  const get_Users = async () => {
    try {
      const response = await axiosInstance.get(`/${USERS}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    get_Users();
  }, []);

  return (
    <div>
      <p>Users</p>
      <Logout />
    </div>
  );
};

export default Users;
