import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/styles/common.css";

const NavigationBar = () => {
  return (
    <>
      <div className="navbar-bg" id="navigationbar">
        <Navbar expand="lg" className="navbar-light p-3">
          <img src="/images/logo2.png" className="logo-container" />
          <h4 className="site-name">ONLINE BOOK LIBRARY</h4>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">🏠 Home</Nav.Link>
              <Nav.Link href="#login">✅ Login</Nav.Link>
              <Nav.Link href="#register">📝 Register</Nav.Link>
              <Nav.Link href="#profile">🧑‍💼 Profile </Nav.Link>
              <Nav.Link href="#members">👫 Members</Nav.Link>
              <Nav.Link href="#books">📚 Books</Nav.Link>
              <Nav.Link href="#borrows">📆Borrows</Nav.Link>
              <Nav.Link href="#reservations">⌛Reservations</Nav.Link>
              {/* <NavDropdown title="➕ More" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#logout">⭕ Logout</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavigationBar;
