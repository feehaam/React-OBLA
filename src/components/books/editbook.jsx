import React, { useState, useEffect } from "react";
import axiosInstance from "../../scripts/axios.instance";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = ({ notify }) => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    imgUrl: "",
    description: "",
  });
  const [isCreateMode, setIsCreateMode] = useState(false);

  const { bookId } = useParams();

  useEffect(() => {
    notify("", "startLoading");
    const api = `/books/${bookId}`;
    console.log("api is: " + api);
    if (bookId === null || bookId === undefined || bookId === "0") {
      setIsCreateMode(true);
      setBookData({
        title: "",
        author: "",
        isbn: "",
        imgUrl: "",
        description: "",
      });
    } else {
      console.log("Calling the server for book info.");
      axiosInstance
        .get(api)
        .then((response) => {
          setBookData(response.data);
          console.log(response);
        })
        .catch((error) => {
          notify(`The book with ID ${bookId} is was not found.`, "danger");
        });
    }
    notify("", "endLoading");
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = () => {
    notify("", "startLoading");
    if (isCreateMode) {
      axiosInstance
        .post("/books/create", bookData)
        .then((response) => {
          console.log(response);
          notify("Book created succesfully.", "success");
          setTimeout(() => {
            navigate("/books-manage");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          notify("Failed to create book, try again later. ", "dagner");
        });
    } else {
      axiosInstance
        .put(`/books/update/${bookId}`, bookData)
        .then((response) => {
          notify("Book updated succesfully. See book details.", "success");
          console.log(response);
          setTimeout(() => {
            navigate("/books-manage");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          notify("Failed to update book, try again later. ", "dagner");
        });
    }
    notify("", "endLoading");
  };

  return (
    <div className="container mt-4">
      <h2>Edit Book</h2>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            className="form-control"
            name="isbn"
            value={bookData.isbn}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            name="imgUrl"
            value={bookData.imgUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="btn btn-primary" onClick={handleSubmit}>
          {isCreateMode ? "Create Book" : "Update Book"}
        </div>
      </form>
    </div>
  );
};

export default EditBook;
