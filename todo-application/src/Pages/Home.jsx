import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import Footer from './Footer'

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");

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
    <Container maxWidth="md">
      <TextField
        label="Search"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        margin="normal"
      />
      <TextField
        label="New Task"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Priority"
        select
        fullWidth
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        margin="normal"
        SelectProps={{ native: true }}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </TextField>
      <Button variant="contained" onClick={addTask} fullWidth>Add Task</Button>

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
                <TableCell style={{ color: task.priority === "High" ? "red" : task.priority === "Medium" ? "yellow" : "green" }}>
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
      <Footer/>
    </Container>
  );
};

export default Home;
