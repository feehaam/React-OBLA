import React, { useEffect, useState } from "react";
import axiosInstance from "../../scripts/axios.instance";

export const Profile = ({ notify }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (userEmail) {
      axiosInstance
        .get(`/users/profile?email=${userEmail}`)
        .then((response) => {
          setUser(response.data);
          setEditedUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userEmail]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedUserData = {
      userId: user.userId,
      firstName: editedUser.firstName,
      lastName: editedUser.lastName,
      address: editedUser.address,
    };
    axiosInstance
      .put(`/user/${user.userId}`, updatedUserData)
      .then((response) => {
        notify("Your profile info is updated.", "success");
        setUser(editedUser);
        setIsEditing(false);
      })
      .catch((error) => {
        notify("Failed to update profile info.", "danger");
        console.error("Error updating user:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center">
      {user ? (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "15px",
            width: "75%",
            maxWidth: "700px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">Profile Information</h5>
            <hr></hr>
            <p className="card-text">
              <strong>First Name:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={editedUser.firstName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <span>{user.firstName}</span>
              )}
            </p>
            <p className="card-text">
              <strong>Last Name:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={editedUser.lastName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <span>{user.lastName}</span>
              )}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="card-text">
              <strong>Address:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={editedUser.address}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <span>{user.address}</span>
              )}
            </p>
            <p className="card-text">
              <strong>Role:</strong> {user.role.roleName}
            </p>
            {isEditing ? (
              <button onClick={handleSave} className="btn btn-success">
                Save
              </button>
            ) : (
              <button onClick={handleEdit} className="btn btn-primary">
                Edit profile
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>
          <img src="/images/bookgif2.gif" />
        </p>
      )}
    </div>
  );
};

export default Profile;
