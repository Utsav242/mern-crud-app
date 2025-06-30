import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner/Spinner";
import { API_ENDPOINTS } from "../apiEndPoint/apiEndpoints";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second artificial delay
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.GET_USERS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay
    const token = localStorage.getItem("token");
    await axios
      .delete(API_ENDPOINTS.DELETE_USER(userId), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-center" });
      })
      .catch((error) => {
        console.error("Error deleting user", error);
        toast.error("Failed to delete user", { position: "top-center" });
      });
    setLoading(false);
  };
  return (
    <div className="userTable container-fluid px-1 px-md-4">
      {loading && <Spinner />}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <div className="text-align-center mb-2">
            <Link to="/add-user" className="btn btn-primary mb-3 w-100 w-md-auto">
              Add User <i className="fa-solid fa-user-plus"></i>
            </Link>
          </div>
          <h2 className="text-center mb-4">User List</h2>

          {users.length === 0 ? (
            <div className="alert alert-warning text-center" role="alert">
              No users found. Please add a user.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={user._id}>
                        <td> {index + 1} </td>
                        <td> {user.name} </td>
                        <td>{user.email} </td>
                        <td>{user.phone} </td>
                        <td>{user.address} </td>
                        <td className="actionBtn text-nowrap">
                          <Link
                            to={`/update-user/` + user._id}
                            className="editBtn btn btn-success btn-sm me-2"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteUser(user._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
