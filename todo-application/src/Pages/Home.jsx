import React, { useState, useEffect } from "react";
import { 
  Container, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button, 
  Fab 
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import axios from "axios";
import Footer from './Footer';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [open, setOpen] = useState(false); 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:3000/Tasks?userId=${user.id}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  const addTask = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.post("http://localhost:3000/Tasks", { task: newTask, priority, userId: user.id })
      .then(fetchTasks)
      .catch((err) => console.log(err));
    setOpen(false); // Close the popup after task addition
    setNewTask(""); // Clear input
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/Tasks/${id}`)
      .then(fetchTasks)
      .catch((err) => console.log(err));
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
        paddingBottom: '80px' // Ensure space for the footer
      }}
    >
      {/* Search Task Input */}
      <TextField
        label="Search"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        margin="normal"
      />

      {/* Task List */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.task}</TableCell>
                <TableCell 
                  style={{ 
                    color: task.priority === "High" ? "red" : task.priority === "Medium" ? "yellow" : "green" 
                  }}
                >
                  {task.priority}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Floating Action Button for Adding Task */}
      <Fab 
        color="primary" 
        aria-label="add" 
        style={{ position: 'fixed', bottom: 20, right: 20 }} 
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Dialog (Popup) for Adding Task */}
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
          <Button onClick={addTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Home;
