import React, { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/AxiosInstance";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Dashboard/Loading";

const RequireAuth = () => {
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
        ) : (
          <Outlet />
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default RequireAuth;
