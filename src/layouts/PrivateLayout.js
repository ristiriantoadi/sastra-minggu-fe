import { Container } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import NavbarPrivate from "../components/NavbarPrivate";

function PrivateLayout() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <NavbarPrivate></NavbarPrivate>
      <Container style={{ maxWidth: "90%", paddingTop: "20px" }}>
        {token ? <Outlet /> : <Navigate to="/login"></Navigate>}
      </Container>
    </div>
  );
}

export default PrivateLayout;
