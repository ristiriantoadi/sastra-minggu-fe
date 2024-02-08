import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavbarPublic from "../components/NavbarPublic";

function PublicLayout() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <NavbarPublic></NavbarPublic>
      {token ? <Navigate to="/dashboard"></Navigate> : <Outlet />}
    </div>
  );
}

export default PublicLayout;
