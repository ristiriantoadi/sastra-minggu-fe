import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { privateAxios } from "../util/util-axios";

function NavbarPrivate() {
  // const { currentUser, notifCount } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();

  const checkToken = async () => {
    try {
      const response = await privateAxios.get("/member/auth/check_token");
      setCurrentUser(response.data);
    } catch (error) {
      console.log("error", error);
      return;
    }
  };

  useEffect(() => {
    // console.log("use effect called");
    checkToken();
  }, []);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container className="container-fluid">
        <Navbar.Brand href="/">Sastra Minggu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <span style={{ pointerEvents: "none" }} className="nav-link">
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
              {currentUser?.name}
            </span>
            <Nav.Link>
              <FontAwesomeIcon
                icon={faSignOut}
                style={{ marginRight: "5px" }}
              />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPrivate;
