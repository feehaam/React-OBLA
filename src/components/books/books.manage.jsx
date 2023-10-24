import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../scripts/axios.instance";
import "../styles/book.css";

export const ManageBooks = ({ notify }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    notify("", "startLoading");
    axiosInstance
      .get("/books/all")
      .then((response) => {
        notify("", "endLoading");
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        notify("", "endLoading");
        notify("Failed to load the books, come back later.", "");
      });
  }, []);

  const handleDeleteBook = (bookId, deleted) => {
    notify("", "startLoading");
    if (deleted === "Yes") {
      notify("Book is already archived.", "danger");
    } else {
      axiosInstance
        .delete("/books/" + bookId + "/delete")
        .then(() => {
          notify("", "endLoading");
          setBooks((prevBooks) =>
            prevBooks.map((book) => {
              if (book.bookId === bookId) {
                return { ...book, deleted: "Yes" };
              }
              return book;
            })
          );
          notify("Book archived successfully.", "success");
        })
        .catch((error) => {
          console.error("Error archiving book:", error);
          notify("Failed to archive the book.", "danger");
          notify("", "endLoading");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2
        style={{ color: "#a00043", fontFamily: "math", marginBottom: "20px" }}
      >
        ALL AVAILABLE BOOKS
        <Link
          to="/edit-book/0"
          style={{
            float: "right",
            border: "2px solid white",
            borderRadius: "10px",
          }}
        >
          <button className="btn btn-primary">Add New Book</button>
        </Link>
      </h2>

      <div className="row">
        {books.map((book) => (
          <div key={book.bookId} className="col-lg-4 col-md-6 mb-4">
            <div className="card cardcont">
              <Link
                to={`/books/${book.bookId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={book.imgUrl}
                  className="card-img-top cover"
                  alt={book.title}
                />
              </Link>

              <div className="card-body description">
                <Link
                  to={`/books/${book.bookId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
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
                    <strong>Status:</strong>{" "}
                    {book.deleted === "Yes" ? "Book Archived" : book.status}
                  </p>
                </Link>
                <hr></hr>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    // border: "1px solid #ddd",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <Link to={`/edit-book/${book.bookId}`}>
                    <button className="btn btn-outline-primary">
                      Edit Book
                    </button>
                  </Link>

                  <button
                    className={`btn btn-outline-danger ${
                      book.deleted === "Yes" ? "disabled" : ""
                    }`}
                    onClick={() => handleDeleteBook(book.bookId, book.deleted)}
                    disabled={book.deleted === "Yes"}
                  >
                    {book.deleted === "Yes" ? "Book Archived" : "Delete Book"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
