import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../scripts/axios.instance";
import "../styles/book.css";

export const Home = ({ notify }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    notify("", "startLoading");
    axiosInstance
      .get("/books/all")
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
        notify("", "endLoading");
      })
      .catch((error) => {
        notify("", "endLoading");
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <br></br>
      <div className="row">
        {books.map((book) => (
          <div key={book.bookId} className="col-lg-4 col-md-6 mb-4">
            <Link
              to={`/books/${book.bookId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card cardcont">
                <img
                  src={book.imgUrl}
                  className="card-img-top cover"
                  alt={book.title}
                />
                <div className="card-body description">
                  <h5 className="card-title" style={{ color: "#a00043" }}>
                    {book.title}
                  </h5>
                  <hr></hr>
                  <p className="card-text">
                    {book.description.length > 70
                      ? `${book.description.slice(0, 70)}...`
                      : book.description}
                  </p>
                  <p
                    className="card-text text-muted"
                    style={{ color: "#a00043" }}
                  >
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p
                    className="card-text text-muted"
                    style={{ color: "#a00043" }}
                  >
                    <strong>Status:</strong> {book.status}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
