import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Radio from "@mui/material/Radio";
import { green, yellow, red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { addTask } from "../Pages/indexedDB"; // Import the addTask function

const Popadd = ({ onAddTask }) => {
  const [selectedValue, setSelectedValue] = useState("a");
  const [task, setTask] = useState({
    priority: "",
    task: "",
  });

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    setTask((prevState) => ({
      ...prevState,
      priority: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (task.task === "") {
      alert("Task cannot be empty?");
    } else {
      try {
        await addTask(task);
        alert("Task saved successfully");
        onAddTask(task); // Call the parent component's handler to update the state
      } catch (err) {
        console.log(err);
        alert("Failed to save the task");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <Paper
          elevation={5}
          component="paper"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, border: "none" }}
            placeholder="Task description"
            name="task"
            type="text"
            onChange={(e) => setTask({ ...task, task: e.target.value })}
            inputProps={{ "aria-label": "Tasks" }}
          />
          <Radio
            sx={{
              color: green[800],
              "&.Mui-checked": {
                color: green[600],
              },
            }}
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
          />
          <Radio
            sx={{
              color: yellow[800],
              "&.Mui-checked": {
                color: yellow[600],
              },
            }}
            checked={selectedValue === "b"}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            inputProps={{ "aria-label": "B" }}
          />
          <Radio
            sx={{
              color: red[800],
              "&.Mui-checked": {
                color: red[600],
              },
            }}
            checked={selectedValue === "c"}
            onChange={handleChange}
            value="c"
            name="radio-buttons"
            inputProps={{ "aria-label": "C" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="add">
            <AddIcon />
          </IconButton>
        </Paper>
      </form>
    </>
  );
};

export default Popadd;
