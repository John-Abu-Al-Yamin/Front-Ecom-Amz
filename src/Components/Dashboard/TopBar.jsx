import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useMainContext } from "../../context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import axiosInstance from "../../Api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { RiLoaderFill } from "react-icons/ri";
import Cookie from "cookie-universal";

const TopBar = () => {
  const { isOpen, setIsOpen } = useMainContext();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();

  useEffect(() => {
    axiosInstance
      .get(`/${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const handelLogout = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/${LOGOUT}`);
      console.log(res);
      cookie.remove("access_token");
      navigate("/login");
      toast.success(res.data.message);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-[70px] w-full bg-white shadow-md z-20 flex items-center justify-between px-5">
      <div
        className={`flex items-center duration-300 transition-all ${
          isOpen ? "gap-16" : "gap-4"
        }`}
      >
        <h3 className="text-xl font-semibold">E-Commerce</h3>
        <IoMdMenu
          size={26}
          className="cursor-pointer text-[#495057] hover:text-[#038edc] transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className="relative flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <FaRegUser />
        <span>{user.name}</span>
        {dropdownOpen && (
          <div className="absolute top-0 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <button
              disabled={loading}
              onClick={handelLogout}
              className="mt-2 w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              {loading ? (
                <RiLoaderFill className="animate-spin mx-auto" />
              ) : (
                "Logout"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
