import React from "react";
import TopBar from "../../Components/Dashboard/TopBar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className=" relative min-h-screen bg-[#f7f8fa] ">
      <TopBar />
      <div className="mt-[70px] flex gap-1">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
