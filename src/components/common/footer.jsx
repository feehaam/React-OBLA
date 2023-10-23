import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/common.css";

const Footer = () => {
  return (
    <footer className="footer text-light text-center py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Techpack</h4>
            <p>
              Borrow books from words #1 online book library, read, learn, share
              and live wise.
            </p>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <p>Email: info@obla.com</p>
            <p>Phone: +8801757455555</p>
          </div>
          <div className="col-md-4 text-light">
            <h4>Follow Us on</h4>
            <span>Facebook</span>
            <br></br>
            <span>Instagram</span>
            <br></br>
            <span>Youtube</span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        &copy; {new Date().getFullYear()} OBLA - All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
