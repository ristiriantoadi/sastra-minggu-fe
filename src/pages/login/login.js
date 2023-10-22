import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonSubmit from "../../components/ButtonSubmit";

function Login() {
  const [loading, setLoading] = useState(false);
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
            Habit Tracker
          </h1>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <ButtonSubmit loading={loading}>Login</ButtonSubmit>
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
