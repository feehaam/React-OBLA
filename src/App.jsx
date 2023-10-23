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

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <ConsolePanel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/members" element={<Members />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books-manage" element={<ManageBooks />} />
          <Route path="/borrows" element={<Borrows />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
        <div className="background-container">
          <div className="body-container">
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

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
