import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axiosInstance from "../../scripts/axios.instance";

export const Borrows = ({ notify }) => {
  const { userId } = useParams();
  const [borrows, setBorrows] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    notify("", "startLoading");
    if (userId) {
      axiosInstance.get(`/users/${userId}/history`).then((response) => {
        notify("", "endLoading");
        setBorrows(response.data);
        if (borrows.length === 0) {
          setEmpty(true);
        }
      });
    }
  }, [userId]);

  const handleReturn = (bookId) => {
    notify("", "startLoading");
    axiosInstance
      .post(`/books/${bookId}/return`)
      .then(() => {
        notify("", "endLoading");
        notify("Book returned successfully.", "success");
        axiosInstance.get(`/users/${userId}/history`).then((response) => {
          setBorrows(response.data);
          if (borrows.length === 0) {
            setEmpty(true);
          }
        });
      })
      .catch((error) => {
        notify("", "endLoading");
        console.error("Error returning the book:", error);
        notify("Error returning the book, try again later.", "danger");
      });
  };

  return (
    <Container className="mt-4">
      <h2 style={{ color: "#a00043", fontFamily: "math" }}>
        BORROWING HISTORY
      </h2>
      {borrows.length === 0 && empty ? (
        <h2
          className="text-center"
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
            maxWidth: "70%",
            backgroundColor: "#fee",
            float: "center",
          }}
        >
          Borrow history is empty.
        </h2>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Book Cover</th>
              <th>Borrow ID</th>
              <th>Book ID</th>
              <th>Book Title</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow.borrowId}>
                <td>
                  <img
                    src={borrow.bookCover}
                    alt={borrow.bookTitle}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{borrow.borrowId}</td>
                <td>{borrow.bookId}</td>
                <td>{borrow.bookTitle}</td>
                <td>{borrow.borrowDate}</td>
                <td>{borrow.dueDate}</td>
                <td>
                  {borrow.returnDate ? borrow.returnDate : "Not returned yet"}
                </td>
                <td>
                  {borrow.returnDate === null && (
                    <Button
                      variant="primary"
                      onClick={() => handleReturn(borrow.bookId)}
                    >
                      Return
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
