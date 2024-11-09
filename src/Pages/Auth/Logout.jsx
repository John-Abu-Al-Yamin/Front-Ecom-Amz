import React from "react";
import Cookie from "cookie-universal";
import { LOGOUT } from "../../Api/Api";
import axiosInstance from "../../Api/AxiosInstance";

const Logout = () => {
  const cookie = Cookie();
  const handelLogout = async () => {
    try {
      const res = await axiosInstance.get(`/${LOGOUT}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handelLogout}>Logout</button>;
};

export default Logout;
