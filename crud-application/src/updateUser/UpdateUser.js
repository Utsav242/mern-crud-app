import React, { useEffect, useState } from "react";
import "./UpdateUser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "../components/Button/Button";
import Spinner from "../components/Spinner/Spinner";
import { API_ENDPOINTS } from "../apiEndPoint/apiEndpoints";

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_ENDPOINTS.GET_USER_BY_ID(id))
      .then((respponse) => {
        setUser(respponse.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
    setLoading(false);
  }, [id]);
  const submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await axios
      .put(API_ENDPOINTS.UPDATE_USER(id), user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding user", error);
      });
    setLoading(false);
  };
  return (
    <div className="UpdateUser">
      {loading && <Spinner />}
      <div className="backBtnContainer">
        <Link to="/" className="backBtn">
          <i className="fas fa-arrow-left"></i> Back
        </Link>
      </div>
      <h1 className="heading">Update User</h1>
      <form className="UpdateUserForm" onSubmit={submitForm}>
        <div className="formGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            value={user.name}
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
            value={user.email}
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
            value={user.phone}
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
            value={user.address}
            placeholder="Enter your Address"
            required
          />
        </div>
        <Button className="submitBtn" type="submit">
          Update User <i className="fa-solid fa-user-edit"></i>
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;
