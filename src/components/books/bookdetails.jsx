import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../scripts/axios.instance";
import { isAdmin, isCustomer, getEmail } from "../account/account.info";
import "../styles/book.css";

export const BookDetails = ({ notify }) => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 1, comment: "" });
  const [empty, setEmpty] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateRID, setUpdateRID] = useState(0);

  const [total, setTotal] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    loadBook();
    loadReviews();
  }, [bookId]);

  function loadBook() {
    axiosInstance
      .get(`/books/${bookId}`)
      .then((response) => {
        setBook(response.data);
        console.log("Book details:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }

  function loadReviews() {
    axiosInstance
      .get(`/books/${bookId}/reviews`)
      .then((response) => {
        setReviews(response.data);
        console.log("Reviews:", response.data);
        if (response.data.length === 0) setEmpty(true);
        const reviews = response.data;
        let totalRating = 0; // Initialize totalRating inside the function
        for (let i = 0; i < reviews.length; i++) {
          totalRating += reviews[i].rating;
          if (reviews[i].userEmail === localStorage.getItem("email")) {
            setNewReview({
              rating: reviews[i].rating,
              comment: reviews[i].comment,
            });
            setUpdateMode(true);
            setUpdateRID(reviews[i].reviewId);
          }
        }
        setTotal(reviews.length);
        if (reviews.length === 0) setTotalRating(0);
        else setTotalRating(totalRating / reviews.length); // Calculate average rating here
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }

  const postReview = () => {
    axiosInstance
      .post(`/books/${bookId}/reviews/create`, newReview)
      .then((response) => {
        setReviews([...reviews, response.data]);
        console.log("Review created:", response.data);
        notify("Review posted.", "success");
        setNewReview({
          rating: 1,
          comment: "",
        });

        loadReviews();
      })
      .catch((error) => {
        console.error("Error creating review:", error);
        notify("Failed to post review.", "danger");
      });
  };

  const putReview = () => {
    axiosInstance
      .put(`/books/${bookId}/reviews/${updateRID}/update`, newReview)
      .then((response) => {
        setReviews([...reviews, response.data]);
        console.log("Review created:", response.data);
        setNewReview({
          rating: 1,
          comment: "",
        });
        notify("Review updated.", "success");
        loadReviews();
      })
      .catch((error) => {
        notify("Failed to update review.", "danger");
        console.error("Error creating review:", error);
      });
  };

  const deleteReview = (reviewId) => {
    axiosInstance
      .delete(`/books/${bookId}/reviews/${reviewId}/delete`)
      .then((response) => {
        console.log(response);
        setReviews(reviews.filter((review) => review.reviewId !== reviewId));
        if (reviews.length === 0) setEmpty(true);
        setUpdateMode(false);
        notify("Review deleted.", "success");
      })
      .catch((error) => {
        notify("Failed to delete review.", "danger");
        console.error("Error deleting review:", error);
      });
  };

  function formatDate(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(undefined, options);
  }

  const canEditReview = (userEmail) => getEmail() === userEmail;

  const handleBorrow = () => {
    axiosInstance
      .post(`/books/${bookId}/borrow`)
      .then((response) => {
        loadBook();
        console.log("Borrow request successful:", response);
        notify("Book borrowed.", "success");
      })
      .catch((error) => {
        notify("Failed to borrow book.", "danger");
        console.error("Error borrowing the book:", error);
      });
  };

  const handleReserve = () => {
    axiosInstance
      .post(`/books/${bookId}/reserve`)
      .then((response) => {
        console.log("Reserve request successful:", response);
        notify("Book reserved.", "success");
      })
      .catch((error) => {
        notify("Failed to reserve book.", "danger");
        console.error("Error reserving the book:", error);
      });
  };

  return (
    <div className="container mt-4">
      {book && (
        <>
          <div style={{ border: "1px solid #aaa", borderRadius: "10px" }}>
            <div class="container">
              <div class="row">
                <div class="col-sm" style={{ textAlign: "center" }}>
                  <img
                    src={book.imgUrl}
                    className="card-img-top"
                    alt={book.title}
                    style={{
                      height: "600px",
                      width: "auto",
                      margin: "15px",
                      borderRadius: "15px",
                    }}
                  />
                </div>
                <div class="col-sm">
                  <div
                    className="card-body"
                    style={{
                      margin: "10px",
                      border: "1px solid #bbb",
                      padding: "15px",
                      borderRadius: "10px",
                      boxShadow: "1px 3px 10px",
                    }}
                  >
                    <h3 className="card-title" style={{ color: "#a00043" }}>
                      {book.title}
                    </h3>
                    <hr></hr>
                    <p className="card-text">{book.description}</p>
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
                      <p>
                        <strong>ISBN:</strong> {book.isbn}
                      </p>
                      <strong>Status:</strong> {book.status}
                    </p>
                    {isAdmin() && (
                      <Link
                        to={`/edit-book/${bookId}`}
                        className="btn btn-primary"
                        style={{ margin: "10px" }}
                      >
                        Edit Book
                      </Link>
                    )}
                    {isCustomer() && (
                      <div>
                        <button
                          onClick={handleBorrow}
                          className={`btn btn-primary ${
                            book.status === "Available" ? "" : "disabled"
                          }`}
                          style={{ margin: "10px" }}
                        >
                          Borrow
                        </button>
                        <button
                          onClick={handleReserve}
                          className={`btn btn-primary ${
                            book.status !== "Available" ? "" : "disabled"
                          }`}
                          style={{ margin: "10px" }}
                        >
                          Reserve
                        </button>
                      </div>
                    )}
                  </div>
                  <div
                    className="card-body"
                    style={{
                      margin: "10px",
                      border: "1px solid #bbb",
                      padding: "15px",
                      borderRadius: "10px",
                      boxShadow: "1px 3px 10px",
                    }}
                  >
                    <h3>Reviews</h3>
                    <h6>
                      {totalRating}/5.0⭐ out of
                      {" " + total} reviews.
                    </h6>
                    <hr></hr>
                    {empty ? <h5>There are no reviews for this book.</h5> : ""}
                    {reviews.map((review) => (
                      <div
                        key={review.reviewId}
                        style={{
                          margin: "5px",
                          padding: "5px",
                          border: "1px solid #ddd",
                          borderRadius: "10px",
                        }}
                      >
                        <p
                          style={{
                            borderTopLeftRadius: "7px",
                            borderTopRightRadius: "7px",
                            backgroundColor: "#5fa8da",
                            padding: "5px",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {review.userFullName}
                        </p>
                        <div
                          style={{
                            margin: "5px",
                            padding: "10px",
                            borderRadius: "15px",
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                          }}
                        >
                          <p>
                            ⭐<b>Rating: {review.rating}</b>
                          </p>
                          <p>{review.comment}</p>
                        </div>
                        <p
                          style={{
                            fontSize: "small",
                            margin: "5px",
                            padding: "5px",
                          }}
                        >
                          {formatDate(review.reviewTime)}
                        </p>

                        {canEditReview(review.userEmail) && (
                          <>
                            <button
                              style={{ marginRight: "15px" }}
                              className="btn btn-primary"
                              onClick={() => updateReview(review.reviewId)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteReview(review.reviewId)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                    <hr></hr>

                    <div>
                      <div style={{ border: "1px solid #ddd", padding: "5px" }}>
                        <b id="#rating" name="rating">
                          ⭐ Rating:{" "}
                        </b>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <label
                            key={rating}
                            style={{ margin: "5px", cursor: "pointer" }}
                          >
                            <input
                              type="radio"
                              name="rating"
                              value={rating}
                              checked={newReview.rating === rating}
                              onChange={(e) =>
                                setNewReview({
                                  ...newReview,
                                  rating: parseInt(e.target.value),
                                })
                              }
                            />
                            {" " + rating}
                          </label>
                        ))}
                      </div>
                      <div>
                        <b>Comment:</b>
                        <br></br>
                        <textarea
                          name="comment"
                          style={{
                            padding: "5px",
                            width: "100%",
                            border: "1px solid #aaa",
                            borderRadius: "5px",
                            marginBottom: "5px",
                          }}
                          value={newReview.comment}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              comment: e.target.value,
                            })
                          }
                        />
                      </div>
                      {updateMode ? (
                        <>
                          <small>You are updating your existing review.</small>
                          <br></br>
                          <button
                            className="btn btn-primary"
                            onClick={putReview}
                          >
                            Update review
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={postReview}
                          >
                            Add Review
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetails;
