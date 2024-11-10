import React, { useEffect } from "react";
import { GOOGLE_CALLBACK } from "../../Api/Api";
import axiosInstance from "../../Api/AxiosInstance";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
const GoogleCallBack = () => {
  const loacation = useLocation();
  const cookie = Cookie();
  const GoogleCall = async () => {
    try {
      const res = await axiosInstance.get(
        `/${GOOGLE_CALLBACK} ${loacation.search}`
      );
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GoogleCall();
  }, []);

  return <div>GoogleCallBack</div>;
};

export default GoogleCallBack;
