import React, { useEffect, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ButtonSubmit from "../../components/ButtonSubmit";
import { publicAxios } from "../../util/util-axios";

function Signup() {
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (username === "") {
      setDisabled(true);
      return;
    }
    if (password === "") {
      setDisabled(true);
      return;
    }
    if (errorConfirmPassword === true) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [username, password, errorConfirmPassword]);

  const signup = async (username, password) => {
    const url = "/guest/auth/register";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const data = {
      username,
      password,
      name: "test",
    };

    try {
      await publicAxios.post(url, data, { headers });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(username, password);
    } catch (error) {
      setLoading(false);
      return;
    }
    navigate("/login");
  };

  return (
    <Container
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "800px", margin: "0 auto" }}>
        <Card.Body>
          <h1 style={{ textAlign: "center" }}>Sastra Minggu</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                type="password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Label>Confirm Password</Form.Label>
                {errorConfirmPassword && (
                  <span
                    style={{
                      color: "#FF0000",
                      fontWeight: "600",
                      fontSize: "14px",
                      padding: "5px 5px",
                    }}
                  >
                    *Password doesn't match
                  </span>
                )}
              </div>
              <Form.Control
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                type="password"
              />
            </Form.Group>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ButtonSubmit disabled={disabled} loading={loading}>
                Sign Up
              </ButtonSubmit>
              <Link style={{ marginLeft: "10px" }} to="/login">
                Login
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signup;
