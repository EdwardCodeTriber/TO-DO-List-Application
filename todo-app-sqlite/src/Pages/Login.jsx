import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { initializeDatabase, authenticateUser } from "./SQlit";

const Login = () => {
  const navigate = useNavigate();
  const [dbInitialized, setDbInitialized] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const loadDb = async () => {
      await initializeDatabase();
      setDbInitialized(true);
    };
    loadDb();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.username === "") {
      alert("Email required");
    } else if (loginData.password === "") {
      alert("Password required");
    } else {
      if (!dbInitialized) {
        alert("Database is not initialized");
        return;
      }
      try {
        const user = authenticateUser(loginData.username, loginData.password);
        if (user) {
          alert("Successful login");
          navigate("/Main");
        } else {
          alert("Wrong Email Or Password");
        }
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
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
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          background="#fafafa"
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
                setLoginData({ ...loginData, username: e.target.value })
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
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <br />
          </div>

          <p>
            Don't have an account? <Link to="/Register"> Sign up</Link>
          </p>
          <div className="links">
            <br />
            <Button variant="outlined" type="submit" disabled={!dbInitialized}>
              Sign In
            </Button>
            {/* <Link to="/Userlist"> see users</Link> */}
          </div>
        </Box>
      </form>
    </>
  );
};

export default Login;
