import React, { useState } from "react";
import {
  Container, Typography, TextField, Button, Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8000/api/register/", data);
      navigate("/"); // redirect to login
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, mt: 10 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Register</Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;