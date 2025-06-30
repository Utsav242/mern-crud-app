import React, {useState} from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_ENDPOINTS } from "../../apiEndPoint/apiEndpoints";
import Spinner from "../Spinner/Spinner";


const Register = () => {

  const users ={ name: '', email: '', password: '' };
  // Initialize state for user registration
  const [register, setRegister] = useState(users);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handler for input changes
  const inputHandler = (e) => {
    const { id, value } = e.target;
    setRegister({ ...register, [id]: value });
  };

  const registerHandler = async (e)=>{
    setLoading(true);
    e.preventDefault();
    await axios .post(API_ENDPOINTS.REGISTER_USER, register)
    .then((response) =>{
      toast.success(response.data.message, { position: "top-center" }) 
      navigate("/")
    })
    .catch((error)=>{
      console.error("Error registering user", error);
      toast.error(error.response.data.message, { position: "top-center" });
    })
    setLoading(false);

  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        {loading && <Spinner />}
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={registerHandler}>
          <TextField
            label="Name"
            id="name"
            onChange={inputHandler}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            id="email"
            onChange={inputHandler}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            id="password"
            onChange={inputHandler}
            type="password"
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Already a user? <a href="/login">Login</a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;