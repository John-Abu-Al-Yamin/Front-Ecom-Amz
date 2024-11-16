import React, { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/AxiosInstance";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Dashboard/Loading";
import Err403 from "./Err403";

const RequireAuth = ({ allowedRole }) => {
  // user
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`/${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const cookie = Cookie();
  const token = cookie.get("access_token");

  return (
    <>
      {token ? (
        user === "" ? (
          <Loading />
        ) : allowedRole.includes(user.role) ? (
          <Outlet />
        ) : (
          <Err403 />
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default RequireAuth;
