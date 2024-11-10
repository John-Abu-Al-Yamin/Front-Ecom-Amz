import React from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <TbFidgetSpinner className="animate-spin text-7xl text-blue-500" />
    </div>
  );
};

export default Loading;
