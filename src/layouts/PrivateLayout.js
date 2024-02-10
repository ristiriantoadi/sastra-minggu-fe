import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import NavbarPrivate from "../components/NavbarPrivate";
import { privateAxios } from "../util/util-axios";

function PrivateLayout() {
  const token = localStorage.getItem("token");
  let location = useLocation();
  const [countNotif, setCountNotif] = useState(0);

  useEffect(() => {
    privateAxios
      .get("/member/notif/count")
      .then((response) => {
        console.log(location.pathname);
        setCountNotif(response.data.count);
      })
      .catch();
  }, []);

  useEffect(() => {
    console.log("pathName", location.pathname);
  });

  return (
    <div>
      {token ? <NavbarPrivate></NavbarPrivate> : null}
      <Container style={{ maxWidth: "90%", paddingTop: "20px" }}>
        <Row>
          <Col sm={2} style={{ marginBottom: "10px" }}>
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
                  <Nav.Item>
                    Karya Saya <Badge bg="primary">{countNotif}</Badge>
                  </Nav.Item>
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
