import React from "react";
import { Container } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import NavbarPublic from "../components/NavbarPublic";

function PublicLayout() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <NavbarPublic></NavbarPublic>
      <Container style={{ maxWidth: "90%", paddingTop: "20px" }}>
        {token ? <Navigate to="/dashboard"></Navigate> : <Outlet />}
      </Container>
    </div>
  );
}

export default PublicLayout;
