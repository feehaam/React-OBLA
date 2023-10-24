import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axiosInstance from "../../scripts/axios.instance";

export const Reservations = ({ notify }) => {
  const [reservations, setReservations] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    // Fetch reservations data from the API
    axiosInstance.get("/reserves").then((response) => {
      console.log(response);
      setReservations(response.data);
      if (response.data.length === 0) {
        setEmpty(true);
      }
    });
  }, []);

  const handleCancelReservation = (bookId) => {
    axiosInstance
      .post(`/books/${bookId}/cancel-reservation`)
      .then((response) => {
        if (response.status === 200) {
          const updatedReservations = reservations.filter(
            (reservation) => reservation.bookId !== bookId
          );
          setReservations(updatedReservations);
          notify("Reservation canceled successfully", "success");
        } else {
          notify("Failed to cancel reservation. Please try again.", "danger");
        }
      })
      .catch((error) => {
        console.log(error);
        notify("Failed to cancel reservation. Please try again.", "danger");
      });
  };

  return (
    <Container className="mt-4">
      <h2 style={{ color: "#a00043", fontFamily: "math" }}>RESERVATIONS</h2>
      {reservations.length === 0 && empty ? (
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
          Reservation list is empty.
        </h2>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Book Cover</th>
              <th>Reservation ID</th>
              <th>Book ID</th>
              <th>Book Title</th>
              <th>Reservation Date</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservationId}>
                <td>
                  <img
                    src={reservation.bookCover}
                    alt={reservation.bookTitle}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{reservation.reservationId}</td>
                <td>{reservation.bookId}</td>
                <td>{reservation.bookTitle}</td>
                <td>
                  {new Date(reservation.reserveDateTime).toLocaleString()}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleCancelReservation(reservation.bookId)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
