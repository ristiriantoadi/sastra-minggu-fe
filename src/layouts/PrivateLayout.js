import { Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import { Navigate, Outlet, useLocation } from "react-router-dom";
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
                <Nav.Item>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
              </ListGroup.Item>
              <ListGroup.Item active={location.pathname === "/karya-saya"}>
                <Nav.Item>
                  <Nav.Link href="/karya-saya">Karya Saya</Nav.Link>
                </Nav.Item>
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
