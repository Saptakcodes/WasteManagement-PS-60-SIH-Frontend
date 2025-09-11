import { Outlet } from "react-router-dom";
import React from "react";
export default function Layout() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[360px] bg-white shadow-md rounded-md p-2 flex flex-col text-sm">
        <Outlet />
      </div>
    </div>
  );
}
