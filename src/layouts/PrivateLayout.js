import { Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import NavbarPrivate from "../components/NavbarPrivate";

function PrivateLayout() {
  const token = localStorage.getItem("token");
  let location = useLocation();

  return (
    <div>
      {token ? <NavbarPrivate></NavbarPrivate> : null}
      <Container style={{ maxWidth: "90%", paddingTop: "20px" }}>
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item active={location.pathname === "/dashboard"}>
                <Link
                  className={
                    location.pathname === "/dashboard" ? "link-active" : "link"
                  }
                  to="/dashboard"
                >
                  <Nav.Item>Dashboard</Nav.Item>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item active={location.pathname === "/karya-saya"}>
                <Link
                  className={
                    location.pathname === "/karya-saya" ? "link-active" : "link"
                  }
                  to="/karya-saya"
                >
                  <Nav.Item>Karya Saya</Nav.Item>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>{token ? <Outlet /> : <Navigate to="/login"></Navigate>}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrivateLayout;
