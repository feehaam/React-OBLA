import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="btn-block"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
