import Test from "./components/Test";
import { FirstSVG, SecondSVG } from "./components/designs/SVG";
import Footer from "./components/footer";
import NavigationBar from "./components/navigationbar";
import "../src/components/styles/app.css";
import MovingBubble from "./components/movingbubble";
import Home from "./components/home";
import LoginPage from "./components/loginpage";
import ConsolePanel from "./components/consolepanel";

function App() {
  return (
    <>
      <NavigationBar />
      <ConsolePanel />
      <LoginPage />
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
          {/* <Home /> */}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
