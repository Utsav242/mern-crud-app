import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_ENDPOINTS } from "../../apiEndPoint/apiEndpoints";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { id, value } = e.target;
    setLogin({ ...login, [id]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN_USER, login);
      toast.success("Login successful!", { position: "top-center" });
      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      // Redirect or do something after login
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed",
        { position: "top-center" }
      );
    }
    setLoading(false);
  };

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
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={loginHandler}
        >
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
            type="password"
            id="password"
            onChange={inputHandler}
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
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            New user? <a href="/register">Sign up</a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;