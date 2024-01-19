import React, { useEffect, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ButtonSubmit from "../../components/ButtonSubmit";
import { publicAxios } from "../../util/util-axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  let navigate = useNavigate();

  const login = async (username, password) => {
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      await publicAxios.post("/guest/auth/login", data, config);
    } catch (error) {
      return Promise.reject(error);
    }
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    if (username !== "" && password !== "") {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [username, password]);

  return (
    <Container
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card style={{ width: "800px", margin: "0 auto" }}>
        <Card.Body>
          <h1 className="card-title" style={{ textAlign: "center" }}>
            Sastra Minggu
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ButtonSubmit disabled={disabled} loading={loading}>
                Login
              </ButtonSubmit>
              <Link style={{ marginLeft: "10px" }} to="/signup">
                Sign Up
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
