import React from "react";
import { IoMdMenu } from "react-icons/io";
import { useMainContext } from "../../context/MenuContext";

const TopBar = () => {
  const { isOpen, setIsOpen } = useMainContext();

  return (
    <div className="fixed top-0 left-0 h-[70px] w-full bg-white shadow-md z-20 flex items-center justify-between px-5">
      <div className={`flex items-center duration-300 transition-all ${isOpen ? "gap-16" : "gap-4"}`}>
        <h3 className="text-xl font-semibold">E-Commerce</h3>
        <IoMdMenu
          size={26}
          className="cursor-pointer text-[#495057] hover:text-[#038edc] transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </div>
  );
};

export default TopBar;
