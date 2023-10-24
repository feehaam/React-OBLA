import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axiosInstance from "../../scripts/axios.instance";

export const Members = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    notify("", "startLoading");
    axiosInstance.get("/user/all").then((response) => {
      setUsers(response.data);
    });
    notify("", "endLoading");
  }, []);

  // Calculate the indexes of the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <h2 style={{ color: "#a00043", fontFamily: "math" }}>
        ALL REGISTERED MEMBERS
      </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr
              key={user.userId}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>👤</td>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role.roleName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination" style={{ float: "right" }}>
        {Array.from(
          { length: Math.ceil(users.length / usersPerPage) },
          (_, i) => (
            <>
              <Button
                key={i}
                onClick={() => paginate(i + 1)}
                style={{
                  margin: "5px",
                  backgroundColor: "#a00043",
                  boxShadow:
                    i + 1 === currentPage ? "4px 4px 4px #888888" : "none",
                }}
              >
                {i + 1}
              </Button>
            </>
          )
        )}
      </div>
    </Container>
  );
};
