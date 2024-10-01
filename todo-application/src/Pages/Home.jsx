import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  CircularProgress,
  Snackbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
import TaskTable from './TaskTable';
import Profile from './Profile'; // Import Profile component

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State to manage profile visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    fetchUserProfile();
  }, []);

  const fetchTasks = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios.get(`http://localhost:3000/Tasks?userId=${user.id}`)
        .then((res) => setTasks(res.data))
        .catch(() => showAlert("Failed to fetch tasks!"));
    }
  };

  const fetchUserProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios.get(`http://localhost:3000/users/${user.id}`)
        .then((res) => setUser(res.data))
        .catch(() => showAlert("Failed to fetch user profile!"));
    }
  };

  const addTask = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoading(true);
      axios.post("http://localhost:3000/Tasks", { task: newTask, priority, userId: user.id })
        .then(() => {
          fetchTasks();
          showAlert("Task added successfully!");
        })
        .catch(() => showAlert("Failed to add task!"))
        .finally(() => {
          setLoading(false);
          setOpen(false);
          setNewTask("");
        });
    }
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (taskToDelete) {
      setDeletedTasks([...deletedTasks, taskToDelete]);
      setLoading(true);
      axios.delete(`http://localhost:3000/Tasks/${id}`)
        .then(() => {
          fetchTasks();
          showAlert("Task deleted successfully!");
        })
        .catch(() => showAlert("Failed to delete task!"))
        .finally(() => setLoading(false));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const filteredTasks = tasks.filter(task =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '80px',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <MenuIcon onClick={() => setDrawerOpen(true)} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TO DO List
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Search Bar */}
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <TextField
          label="Search"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          margin="normal"
          variant="outlined"
        />
      </Box>

      {/* Conditional Rendering of Profile or TaskTable */}
      {showProfile ? (
        // Show Profile Component
        <Profile /> 
      ) : (
        <TaskTable tasks={filteredTasks} loading={loading} onDelete={deleteTask} />
      )}

      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Description"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Priority"
            select
            fullWidth
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTask} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Container sx={{ width: 250, padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            User Profile
          </Typography>
          {user && (
            <>
              <Avatar
                alt="Profile Picture"
                src={user.profilePic || "/default-avatar.png"}
                sx={{ width: 80, height: 80, marginBottom: "16px" }}
              />
              <Typography>Name: {user.name}</Typography>
              <Typography>Email: {user.username}</Typography>
            </>
          )}
          <Typography variant="h6" sx={{ marginTop: "16px" }}>
            Deleted Tasks
          </Typography>
          <List>
            {deletedTasks.length > 0 ? (
              deletedTasks.map((task) => (
                <ListItem key={task.id}>
                  <ListItemText
                    primary={task.task}
                    secondary={`Priority: ${task.priority}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No deleted tasks yet.</Typography>
            )}
          </List>

          <Button
            variant="outlined"
            onClick={handleSignOut}
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            Sign Out
          </Button>
        </Container>
      </Drawer>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message={alertMessage}
      />
      <Footer />
    </Container>
  );
};

export default Home;
