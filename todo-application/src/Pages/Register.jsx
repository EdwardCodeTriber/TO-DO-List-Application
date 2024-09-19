import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; 
import CircularProgress from "@mui/material/CircularProgress"; 
import axios from "axios";
import BackgroundImage from "/public/Todo.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [confirmpassword, setConfirmPassword] = useState("");
  const [registerdata, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
    picture:"",
  });
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 


  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (registerdata.email === "") {
      setSnackbarOpen(true);
      setSnackbarMessage("Email required");
    } else if (!validateEmail(registerdata.email)) {
      setSnackbarOpen(true);
      setSnackbarMessage("Please enter a valid email");
    } else if (registerdata.name === "") {
      setSnackbarOpen(true);
      setSnackbarMessage("Name required");
    } else if (registerdata.password === "") {
      setSnackbarOpen(true);
      setSnackbarMessage("Password required");
    } else if (registerdata.password.length < 6) {
      setSnackbarOpen(true);
      setSnackbarMessage("Password must be at least 6 characters long");
    } else if (confirmpassword === "") {
      setSnackbarOpen(true);
      setSnackbarMessage("Confirm your password");
    } else if (confirmpassword !== registerdata.password) {
      setSnackbarOpen(true);
      setSnackbarMessage("Password does not match");
    } else {
      setLoading(true); 

      // Register the user
      axios
        .post("http://localhost:3000/users", registerdata)
        .then((result) => {
          console.log(result);

          // Show success message and delay navigation
          setSnackbarOpen(true);
          setSnackbarMessage("Registered Successfully!");
          setLoading(false); 

          setTimeout(() => {
            navigate("/Login");
          }, 2000); 
        })
        .catch((err) => {
          console.log(err);
          setLoading(false); 
          setSnackbarOpen(true);
          setSnackbarMessage("An error occurred during registration");
        });
    }
  };


  // Function to open the privacy policy modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Function to close the Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
      <form onSubmit={handleSubmit} className="form-register">
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
          <h1>Register</h1>
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
          />
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            type="text"
            fullWidth
            margin="normal"
            onChange={(e) =>
              setRegisterData({ ...registerdata, name: e.target.value })
            }
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
          />
          <TextField
            id="standard-basic"
            label="Confirm Password"
            variant="standard"
            name="confirm-password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Box mt={2}>
            {/* Link to open the privacy policy modal */}
            <Button onClick={handleClickOpen} color="secondary">
              Privacy and Security Protocol
            </Button>
          </Box>

          <Box mt={3} width="100%" textAlign="center">
            {/* Show loader if registering, otherwise show the Register button */}
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                fullWidth
                sx={{ color: "black", backgroundColor: "#22c55e" }}
              >
                Register
              </Button>
            )}
          </Box>
          <Box mt={2}>
            <Link to="/Login">Cancel</Link>
          </Box>

          {/* Privacy and Security Modal */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Privacy and Security Protocol</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Here are the details about how we handle your privacy and
                security...
                <br />
                1. Your data is encrypted.
                <br />
                2. We do not share your information with third parties without
                your consent.
                <br />
                3. Secure authentication is used for your login.
                {/* Add more details as necessary */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Success Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarMessage.includes("Successfully") ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
