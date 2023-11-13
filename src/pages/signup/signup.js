import React, { useEffect, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonSubmit from "../../components/ButtonSubmit";

function Signup() {
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
  }, [password, confirmPassword]);

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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="name@example.com"
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
              <ButtonSubmit loading={loading}>Sign Up</ButtonSubmit>
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
