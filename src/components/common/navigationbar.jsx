import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/styles/common.css";
import { isAdmin, isCustomer, isLogged } from "../account/account.info";

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
              {isLogged() && <Nav.Link href="/">🏠 Home</Nav.Link>}
              {!isLogged() && (
                <>
                  <Nav.Link href="/login">✅ Login</Nav.Link>
                  <Nav.Link href="/register">📝 Register</Nav.Link>
                </>
              )}
              {isLogged() && <Nav.Link href="/profile">🧑 Profile </Nav.Link>}
              {isCustomer() && <Nav.Link href="/books">📚 Books</Nav.Link>}
              {isAdmin() && <Nav.Link href="/books-manage">📚 Books</Nav.Link>}
              {isCustomer() && <Nav.Link href="/borrows">📆Borrows</Nav.Link>}
              {isCustomer() && (
                <Nav.Link href="/reservations">⌛Reservations</Nav.Link>
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
