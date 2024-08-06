import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { initializeDatabase, insertUser } from "./SQlit";

const Register = () => {
  const navigate = useNavigate();

  const [confirmpassword, setConfirmPassword] = useState("");
  // Use State to hold inputs from the form
  const [registerdata, setRegisterData] = useState({
    username: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    // Initialize the SQLite database
    initializeDatabase();
  }, []);
// handle submit to check empty fields
  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerdata.username === "") {
      alert("username required");
    } else if (registerdata.name === "") {
      alert("Name required");
    } else if (registerdata.password === "") {
      alert("Password required");
    } else if (confirmpassword === "") {
      alert("confirm your password");
    } else if (confirmpassword !== registerdata.password) {
      alert("password does not match");
    } else {
      alert("Registered Successfully");

      console.log(registerdata);
      // Insertion into database using importted function 
      insertUser(registerdata.username, registerdata.name, registerdata.password);
      navigate("/Login");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-register">
        <Box
          height={400}
          width={400}
          margin="auto"
          my={4}
          flex-direction="column"
          alignItems="center"
          background="#fafafa"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey", background: "#fafafa" }}
        >
          <h1>Register</h1>
          <br />
          <TextField
            id="input-with-icon-textfield"
            label="Account"
            name="username"
            type="email"
            onChange={(e) =>
              setRegisterData({ ...registerdata, username: e.target.value })
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
          <br />
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            type="text"
            onChange={(e) =>
              setRegisterData({ ...registerdata, name: e.target.value })
            }
          />
          <br />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            name="password"
            type="password"
            onChange={(e) =>
              setRegisterData({ ...registerdata, password: e.target.value })
            }
          />
          <br />
          <TextField
            id="standard-basic"
            label="Confirm Password"
            variant="standard"
            name={confirmpassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <br/>
          <br/>
          <br/>


          <div className="links">
            <br />
            <Button variant="outlined" type="submit">
              Register
            </Button>
            <Link to="/Login"> Cancel</Link>
          </div>
        </Box>
      </form>
    </>
  );
};

export default Register;
