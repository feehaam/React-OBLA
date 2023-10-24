import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/styles/common.css";
import { isAdmin, isCustomer, isLogged } from "../account/account.info";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar-bg" id="navigationbar">
        <Navbar expand="lg" className="navbar-light p-3">
          <img src="/images/logo2.png" className="logo-container" />
          <h4 className="site-name">ONLINE BOOK LIBRARY</h4>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {isLogged() && (
                <Nav.Link onClick={() => navigate("/")}>🏠 Home</Nav.Link>
              )}
              {!isLogged() && (
                <>
                  <Nav.Link onClick={() => navigate("/login")}>
                    ✅ Login
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/register")}>
                    📝 Register
                  </Nav.Link>
                </>
              )}
              {isLogged() && (
                <Nav.Link onClick={() => navigate("/profile")}>
                  🧑 Profile{" "}
                </Nav.Link>
              )}
              {isCustomer() && (
                <Nav.Link onClick={() => navigate("/books")}>📚 Books</Nav.Link>
              )}
              {isAdmin() && (
                <>
                  <Nav.Link onClick={() => navigate("/books-manage")}>
                    📚 Books
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/members")}>
                    👥 Members
                  </Nav.Link>
                </>
              )}
              {isCustomer() && (
                <Nav.Link onClick={() => navigate("/borrows/0")}>
                  📆Borrows
                </Nav.Link>
              )}
              {isCustomer() && (
                <Nav.Link onClick={() => navigate("/reservations")}>
                  ⌛Reservations
                </Nav.Link>
              )}
              {isLogged() && <Nav.Link href="/logout">⭕ Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavigationBar;
