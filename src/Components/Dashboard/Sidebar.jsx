import React from "react";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Bars.css";
import { useMainContext } from "../../context/MenuContext";
import { useWidthContext } from "../../context/WindowContext";

const Sidebar = () => {
  const { isOpen } = useMainContext();
  const {windowSize, setWindowSize} = useWidthContext();

  return (
    <div
      className={`${
        isOpen ? "w-56" : "w-16"
      } ${windowSize < 768 ? isOpen?"left-0":"left-[-100%]":0 } pt-3 sticky top-[70px] left-0 h-screen transition-all duration-300 ease-in-out shadow-md bg-white z-10 text-base `}
    >
      <NavLink
        to="users"
        className="flex my-2 items-center gap-3 text-[#495057] px-5 py-3 rounded-md hover:bg-[#f2f3fe] hover:text-[#038edc] transition-colors duration-300 ease-in-out"
      >
        <FaUsers />
        <span className={isOpen ? "block" : "hidden"}>Users</span>
      </NavLink>

      <NavLink
        to="products"
        className="flex my-2 items-center gap-3 text-[#495057] px-5 py-3 rounded-md hover:bg-[#f2f3fe] hover:text-[#038edc] transition-colors duration-300 ease-in-out"
      >
        <FaUsers />
        <span className={isOpen ? "block" : "hidden"}>Products</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
