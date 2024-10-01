import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Avatar, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null); // To store user profile info
  const [editMode, setEditMode] = useState(false); // To toggle between view and edit mode
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [tasks, setTasks] = useState([]); // To store tasks related to the user

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    fetchUserProfile(userId);
    fetchUserTasks(userId);
  }, []);

  // Fetch user profile
  const fetchUserProfile = (userId) => {
    axios.get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        const { name, email, profilePic } = res.data;
        setUser(res.data);
        setName(name);
        setEmail(username);
        setProfilePic(profilePic);
      })
      .catch((err) => console.log(err));
  };

  // Fetch user tasks
  const fetchUserTasks = (userId) => {
    axios.get(`http://localhost:3000/Tasks?userId=${userId}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  // Update user profile
  const updateUserProfile = () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    axios.put(`http://localhost:3000/users/${userId}`, {
      name,
      username,
      profilePic,
    })
      .then((res) => {
        setUser(res.data);
        setEditMode(false); // Turn off edit mode after saving
      })
      .catch((err) => console.log(err));
  };

  // Handle file upload for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For simplicity, just use a placeholder image URL instead of uploading to a real server
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: "16px", marginBottom: "20px" }}>
        <Typography variant="h4">User Profile</Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar 
              alt="Profile Picture"
              src={profilePic || "/default-avatar.png"} // Use default if no profile pic
              sx={{ width: 80, height: 80 }}
            />
            {editMode && (
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ marginTop: '10px' }} 
              />
            )}
          </Grid>
          <Grid item xs={8}>
            {editMode ? (
              <>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              <>
                <Typography variant="h6">Name: {name}</Typography>
                <Typography variant="h6">Email: {username}</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <Button variant="contained" color="primary" onClick={updateUserProfile}>
                Save
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* User's Task List */}
      <Paper elevation={3} sx={{ padding: "16px" }}>
        <Typography variant="h5" gutterBottom>
          My Tasks
        </Typography>
        {tasks.length === 0 ? (
          <Typography>No tasks available</Typography>
        ) : (
          tasks.map((task) => (
            <Typography key={task.id}>
              {task.task} - {task.priority}
            </Typography>
          ))
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
