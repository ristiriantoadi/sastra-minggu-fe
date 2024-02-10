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
        setCountNotif(response.data.count);
      })
      .catch();
  }, []);

  const resetCountNotif = () => {
    privateAxios
      .put("/member/notif/reset_count")
      .then(() => {
        setCountNotif(0);
      })
      .catch();
  };

  useEffect(() => {
    if (location.pathname === "/karya-saya") {
      resetCountNotif();
    }
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
                    Karya Saya{" "}
                    {countNotif > 0 && <Badge bg="primary">{countNotif}</Badge>}
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
