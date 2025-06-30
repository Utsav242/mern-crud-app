import React, { useState } from "react";
import "./AddUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "../components/Button/Button";
import Spinner from "../components/Spinner/Spinner";
import { API_ENDPOINTS } from "../apiEndPoint/apiEndpoints";

const AddUser = () => {
  const users = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const token = localStorage.getItem("token");
    await axios
      .post(API_ENDPOINTS.ADD_USER, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding user", error);
        toast.error(error.response?.data?.message || "Failed to add user", { position: "top-center" });
      });
    setLoading(false);
  };
  return (
    <div className="addUser">
      {loading && <Spinner />}
      <div className="backBtnContainer">
        <Link to="/" className="backBtn">
          <i className="fas fa-arrow-left"></i> Back
        </Link>
      </div>
      <h1 className="heading">Add New User</h1>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="formGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            placeholder=" Enter your email"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            onChange={inputHandler}
            name="phone"
            placeholder="Enter your Phone Number"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            onChange={inputHandler}
            name="address"
            placeholder="Enter your Address"
            required
          />
        </div>
        <Button className="submitBtn" type="submit">
          Add User
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
