import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonSubmit from "../../components/ButtonSubmit";

function Signup() {
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
          <h1 style={{ textAlign: "center" }}>Habit Tracker</h1>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" />
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
              <Form.Control required type="password" />
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
