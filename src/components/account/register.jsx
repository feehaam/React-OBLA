import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../scripts/axios.instance";
import { isLogged } from "./account.info";

export const Register = ({ notify }) => {
  if (isLogged()) {
    notify("You are already logged in, log out to access the page.");
    return <Navigate to={"/"} />;
  }

  const navigate = useNavigate();
  const [userType, setUserType] = useState("customer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !address) {
      notify("Please fill in all the required fields.", "danger");
      return;
    }

    if (password !== retypePassword) {
      notify("Passwords do not match.", "danger");
      return;
    }

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
      role: userType.toUpperCase(),
    };

    const apiUrl =
      userType === "admin"
        ? "/user/register/admin?permissionToken=12345"
        : "/user/register";

    axiosInstance
      .post(apiUrl, userData)
      .then((result) => {
        if (result.status === 201) {
          notify(result.data + ". Log in to your account.", "success");
          // Delay for 3 seconds before navigating to login
          setTimeout(() => {
            navigate("/login"); // Navigate to the login page
          }, 3000);
        } else {
          console.log("Exception: ");
          console.log(result);
          notify("Unknown error, please try again", "danger");
        }
      })
      .catch((error) => {
        console.log("Error ");
        console.log(error);
        notify(error.response.data.cause, "danger");
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
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
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Form>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
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
              <Form.Group>
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Retype password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label>User Type</Form.Label>
                <Form.Control
                  as="select"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
              <br></br>
              <div style={{ textAlign: "left" }}>
                <Button
                  variant="primary"
                  type="button"
                  className="btn-block"
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </div>
            </Form>
            <hr></hr>
            <div style={{ marginTop: "15px" }}>
              <p>
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  Already have an account? <Button>Login</Button>
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
