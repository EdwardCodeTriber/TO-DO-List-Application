import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";

const Register = () => {
  const [name, setName] = useState(""); // New state variable for name
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [isTCOpen, setIsTCOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name || !username || !password || !cpassword) {
      setAlert({ type: "error", message: "All fields are required!" });
      return;
    }

    // Check if passwords match
    if (password !== cpassword) {
      setPasswordError("Passwords do not match");
      setAlert({ type: "error", message: "Passwords do not match" });
      return;
    } else {
      setPasswordError("");
    }

    setIsLoading(true); // Start loader

    // If passwords match, proceed with registration
    axios
      .post("http://localhost:3000/users", { name, username, password }) 
      .then((res) => {
        setAlert({ type: "success", message: "Registration Successful" });
        setName(""); 
        setUsername("");
        setPassword("");
        setCPassword("");
        navigate("/LogIn");
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: "Registration failed! Please try again.",
        });
        console.log("Error: ", err);
      })
      .finally(() => setIsLoading(false)); // Stop loader
  };

  const handleTCClose = () => setIsTCOpen(false);

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
          Register
        </Typography>
        {alert.message && (
          <Alert severity={alert.type} style={{ marginBottom: "15px" }}>
            {alert.message}
          </Alert>
        )}
        <form onSubmit={handleRegister}>
          <TextField
            label="Name" 
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            type="password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Typography
            onClick={() => setIsTCOpen(true)}
            style={{ color: "blue", cursor: "pointer", marginTop: "10px" }}
          >
            By clicking on register, you agree to our T&C
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
      </Paper>

      {/* T&C Dialog Popup */}
      <Dialog open={isTCOpen} onClose={handleTCClose}>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            These are the Terms and Conditions of the application. Please read
            them carefully before proceeding. These Terms and Conditions outline
            the rules and regulations for the use of our application. By
            accessing and using this application, you agree to comply with and
            be bound by the following terms. If you do not agree with any of
            these terms, you must not use the application. 1. Account
            Registration and Security Users must provide accurate and up-to-date
            information during the registration process. You are responsible for
            maintaining the confidentiality of your login credentials and for
            any activities that occur under your account. The application
            reserves the right to terminate accounts that provide false
            information or engage in suspicious activities. 2. User Data
            Protection We are committed to protecting your privacy and personal
            data. All personal information collected during registration or use
            of the app will be handled in accordance with our Privacy Policy.
            The app ensures that your data, including tasks and personal
            details, is accessible only by you and cannot be viewed or modified
            by other users...
            {/* Add the rest of the T&C content here */}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTCClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Register;
