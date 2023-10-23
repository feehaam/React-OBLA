import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../scripts/axios.instance";

export const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/books/all")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Books</h2>
      <div className="row">
        {books.map((book) => (
          <div key={book.bookId} className="col-lg-4 col-md-6 mb-4">
            <Link
              to={`/books/${book.bookId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="card"
                style={{
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={book.imgUrl}
                  className="card-img-top"
                  alt={book.title}
                  style={{ maxHeight: "300px", width: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    {book.description.length > 70
                      ? `${book.description.slice(0, 70)}...`
                      : book.description}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="card-text text-muted">
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

export default Books;
