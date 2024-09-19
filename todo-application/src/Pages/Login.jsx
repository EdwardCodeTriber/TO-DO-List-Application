import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert"; 
import axios from "axios";
import BackgroundImage from "/public/Todo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [registerdata, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  // Form validation
  const validateForm = () => {
    if (!registerdata.email) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(registerdata.email)) {
      return "Invalid email format";
    }
    if (!registerdata.password) {
      return "Password is required";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setAlert({ show: true, type: "error", message: validationError });
      return;
    }
    setError("");
    setLoading(true); 

    setTimeout(() => {
      // Simulate 2 seconds delay
      axios
        .get("http://localhost:3000/users")
        .then((result) => {
          const user = result.data.find(
            (user) =>
              user.email === registerdata.email &&
              user.password === registerdata.password
          );

          if (user) {
            localStorage.setItem(registerdata.email, registerdata.password);
            setLoading(false); 
            setAlert({ show: true, type: "success", message: "Successful login" });
            setTimeout(() => navigate("/Main"), 1500); 
          } else {
            setLoading(false); 
            setAlert({ show: true, type: "error", message: "Wrong Email or Password" });
          }
        })
        .catch((err) => {
          setLoading(false); 
          console.log(err);
          setAlert({ show: true, type: "error", message: "An error occurred during login" });
        });
    }, 2000); // 2 seconds delay
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form onSubmit={handleSubmit} className="form-login">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width={400}
          p={4}
          bgcolor="#fafafa"
          boxShadow={3}
          borderRadius={2}
          sx={{
            border: "1px solid #ccc",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <h1>Login</h1>

          {/* Show Alert if needed */}
          {alert.show && (
            <Alert severity={alert.type} sx={{ width: "100%", mb: 2 }}>
              {alert.message}
            </Alert>
          )}

          <TextField
            id="input-with-icon-textfield"
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            onChange={(e) =>
              setRegisterData({ ...registerdata, email: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
            error={!!error && !registerdata.email}
            helperText={error && !registerdata.email ? error : ""}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) =>
              setRegisterData({ ...registerdata, password: e.target.value })
            }
            error={!!error && !registerdata.password}
            helperText={error && !registerdata.password ? error : ""}
          />

          <Box mt={3} width="100%" textAlign="center">
            <Button
              type="submit"
              fullWidth
              sx={{ color: "black", backgroundColor: "#22c55e" }}
              disabled={loading} 
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"} {/* Loader */}
            </Button>
          </Box>

          <Box mt={2}>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "black" }}
            >
              Don't have an account?{" "}
              <Link
                to="/Register"
                style={{
                  textDecoration: "none",
                  color: "#22c55e",
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
