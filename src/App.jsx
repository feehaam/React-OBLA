import { FirstSVG, SecondSVG } from "./components/designs/SVG";
import Footer from "./components/common/footer";
import NavigationBar from "./components/common/navigationbar";
import "../src/components/styles/app.css";
import MovingBubble from "./components/designs/movingbubble";
import Home from "./components/homepage/home";
import LoginPage from "./components/account/login";
import ConsolePanel from "./components/designs/consolepanel";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import BrowserRouter as Router
import { Register } from "./components/account/register";
import { Profile } from "./components/Users/profile";
import { Members } from "./components/Users/members";
import { Books } from "./components/books/books";
import { ManageBooks } from "./components/books/books.manage";
import { Borrows } from "./components/orders/borrow";
import { Reservations } from "./components/orders/reservations";
import { Authenticate } from "./components/account/authenticate";
import { useState } from "react";
import { Logout } from "./components/account/logout";
import EditBook from "./components/books/editbook";
import BookDetails from "./components/books/bookdetails";

function App() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const x = 10;

  const notify = (message, type) => {
    if (type === "startLoading") {
      console.log("starting loading...");
      setLoading(true);
      return;
    }
    if (type === "endLoading") {
      console.log("ending loading...");
      setLoading(false);
      return;
    }
    console.log("Creating new notification: " + message + " (" + type + ")");
    const notifyItem = {
      message: message,
      type: type,
    };

    setNotification([...notification, notifyItem]);
  };

  return (
    <>
      <Router>
        <NavigationBar />
        <ConsolePanel
          notification={notification}
          loading={loading}
          setLoading={setLoading}
        />
        <div className="flex-container">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage notify={notify} />} />
            <Route path="/register" element={<Register notify={notify} />} />

            {/* Authenticated routes */}
            <Route
              element={<Authenticate requiredRole={"ANY"} notify={notify} />}
            >
              <Route path="/" element={<Home notify={notify} />} />
              <Route path="/profile" element={<Profile notify={notify} />} />
              <Route path="/logout" element={<Logout notify={notify} />} />
              <Route
                path="/borrows/:userId"
                element={<Borrows notify={notify} />}
              />
              <Route
                path="/books/:bookId"
                element={<BookDetails notify={notify} />}
              />
            </Route>

            {/* Customer-only routes */}
            <Route
              element={
                <Authenticate requiredRole={"CUSTOMER"} notify={notify} />
              }
            >
              <Route path="/books" element={<Books notify={notify} />} />
              <Route
                path="/reservations"
                element={<Reservations notify={notify} />}
              />
            </Route>

            {/* Admin only routes */}
            <Route
              element={<Authenticate requiredRole={"ADMIN"} notify={notify} />}
            >
              <Route path="/members" element={<Members notify={notify} />} />
              <Route
                path="/books-manage"
                element={<ManageBooks notify={notify} />}
              />
              <Route
                path="/edit-book/:bookId"
                element={<EditBook notify={notify} />}
              />
            </Route>
          </Routes>
          <div className="background-container">
            <div className="svg-background">
              <MovingBubble />
            </div>
            <div className="svg-background">
              <SecondSVG />
            </div>
            <div className="svg-background">
              <FirstSVG />
            </div>
          </div>
        </div>
        <div
          className="loading-overlay"
          style={{
            display: loading ? "block" : "none",
            position: "fixed",
            top: "100px",
            left: "100px",
            zIndex: 1000,
          }}
        >
          <div
            className="loading-content"
            style={{
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: "rgba(0,0,0,0.2)",
              boxShadow: "2px 2px 5px",
              maxWidth: "60%",
            }}
          >
            <img
              style={{ maxWidth: "100%" }}
              src="/images/bookgif2.gif"
              alt="Loading"
              className="loading-gif"
            />
            <h3>Loading...</h3>
          </div>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export { App };
