import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import sidebarLinks from "./SidebarLinks"; // Ensure this path is correct
import { useMainContext } from "../../context/MenuContext";
import { useWidthContext } from "../../context/WindowContext";
import axiosInstance from "../../Api/AxiosInstance";
import { USER } from "../../Api/Api";

const Sidebar = () => {
  const { isOpen } = useMainContext();
  const { windowSize } = useWidthContext();

  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login", { replace: true }));
  }, [navigate]);

  const sidebarClass = `pt-3 left-0 h-screen transition-all duration-300 ease-in-out shadow-md bg-white z-10 text-base ${
    windowSize < 768 ? (isOpen ? "left-0" : "left-[-100%]") : "left-0"
  } ${isOpen ? "w-56" : "w-16"} ${
    windowSize > 768 ? "sticky top-[70px]" : "fixed"
  }`;

  const linkClass =
    "flex my-2 items-center gap-3 text-[#495057] px-5 py-3 rounded-md hover:bg-[#f2f3fe] hover:text-[#038edc] transition-colors duration-300 ease-in-out";

  return (
    <div className={sidebarClass}>
      {sidebarLinks.map((link, index) =>
        link.role.includes(user.role) ? (
          <NavLink key={index} to={link.to} className={linkClass}>
            <link.icon />
            {isOpen && <span>{link.label}</span>}
          </NavLink>
        ) : null
      )}
    </div>
  );
};

export default Sidebar;
