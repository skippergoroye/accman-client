import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout({ children }) {
  console.log("this is an admin route");
  return (
    <>
      <Outlet />
    </>
  );
}

export default AdminLayout;
