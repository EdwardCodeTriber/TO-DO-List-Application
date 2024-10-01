import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [alert, setAlert] = useState({ type: "", message: "" }); // Alert state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if username and password are filled
    if (!username || !password) {
      setAlert({ type: "error", message: "Both fields are required!" });
      return;
    }

    setIsLoading(true); // Start loader

    // Send login request
    axios
      .post("http://localhost:3000/users", { username, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data)); // Save user data
        setAlert({ type: "success", message: "Login Successful!" });
        setTimeout(() => navigate("/home"), 2000); // Navigate to home page after 1 second
      })
      .catch((err) => {
        setAlert({ type: "error", message: "Login failed! Invalid credentials." });
        console.log("Error: ", err);
      })
      .finally(() => setIsLoading(false)); // Stop loader
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          marginTop: "50px",
          backgroundColor: "#cbd5e1",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        {alert.message && (
          <Alert severity={alert.type} style={{ marginBottom: "15px" }}>
            {alert.message}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            style={{ marginTop: "20px" }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
