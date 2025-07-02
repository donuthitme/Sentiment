import React, { useState } from "react";
import {
  Container, Box, Typography, TextField, Button, Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/token/", credentials);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/feedback"); // redirect after login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, mt: 10 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleChange} />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;