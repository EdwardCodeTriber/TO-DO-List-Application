import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Components/Login.css";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  // const [userlog, setEmail] = useState("");
  // const [passwordlog, setPassword] = useState("");
  const [registerdata, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerdata.username === "") {
      alert("Email required");
    } else if (registerdata.password === "") {
      alert("password required");
    } else {
      axios
        .get("http://localhost:3000/users")
        .then((result) => {
          result.data.map((user) => {
            console.log(result);
            console.log(registerdata);
            if (
              user.username === registerdata.username &&
              user.password === registerdata.password
            ) {
              localStorage.setItem(registerdata.username,registerdata.password);
              alert("Succesfull login");
              navigate("/Main");
            } else if (
              registerdata.username !== "" &&
              registerdata.password !== ""
            ) {
              alert("Wrong Email Or Password");
            }
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-login">
        <Box
          height={400}
          width={400}
          margin="auto"
          my={4}
          flex-direction="column"
          justifyContent="center"
          alignItems="center"
          Background="#fafafa"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey", background: "#fafafa" }}
        >
          <h1>Login</h1>
          <br />

          <div className="TextField">
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
              label="Password"
              variant="standard"
              name="password"
              type="password"
              onChange={(e) =>
                setRegisterData({ ...registerdata, password: e.target.value })
              }
            />
            <br />
          </div>

          <p>
            Don't have an account? <Link to="/Register"> Sign up</Link>
          </p>
          <div className="links">
            <br />

            <Button variant="outlined" type="submit">
              Sign In
            </Button>
          </div>
        </Box>
      </form>
    </>
  );
};

export default Login;
