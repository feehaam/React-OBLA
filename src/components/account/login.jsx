import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../scripts/axios.instance";
import { isLogged } from "./account.info";

const LoginPage = ({ notify }) => {
  const navigate = useNavigate();

  if (isLogged()) {
    notify("You are already logged it, log out to access the page.");
    return <Navigate to={"/"} />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || email == undefined || email == null) {
      notify("You entered an invalid email.", "danger");
      return;
    }
    if (!password || password == undefined || password == null) {
      notify("Type your password to log in.", "danger");
      return;
    }
    console.log("Attempting login...");

    const credentials = {
      email: email,
      password: password,
    };

    axiosInstance
      .post("/user/login", credentials)
      .then((result) => {
        if (result.status === 200) {
          console.log("Login successful!");
          const token = result.data.bearerToken;
          const role = result.data.roles[0].replace("ROLE_", "");
          const email = result.data.username;

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("email", email);

          notify("Login successful. Welcome to the library!", "success");
          navigate("/");
        } else {
          console.log("Login failed...");
          notify(result.data.message, "danger");
        }
      })
      .catch((error) => {
        notify(error.response.data.message, "danger");
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={5}>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "15px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          >
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
                  onKeyPress={handleKeyPress}
                />
              </Form.Group>
              <br></br>

              <div style={{ textAlign: "left" }}>
                <Button
                  variant="primary"
                  type="button"
                  className="btn-block"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </div>
            </Form>
            <hr></hr>
            <div style={{ marginTop: "15px" }}>
              <p>
                <Link
                  to={"/forgot-password"}
                  style={{ textDecoration: "none" }}
                >
                  Forgotten password
                </Link>
              </p>
              <p>Do not have a membership?</p>
              <div style={{ textAlign: "center" }}>
                <a href="/register" className="btn btn-success">
                  Create an account
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
