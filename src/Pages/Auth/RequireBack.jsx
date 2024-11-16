import React from "react";
import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

const RequireBack = () => {
  const cookie = Cookie();
  const token = cookie.get("access_token");
  return token ? window.history.back() : <Outlet />;
};

export default RequireBack;
