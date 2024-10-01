// TaskTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const TaskTable = ({ tasks, loading, onDelete }) => {
  return (
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
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.task}</TableCell>
              <TableCell
                style={{
                  color:
                    task.priority === "High"
                      ? "red"
                      : task.priority === "Medium"
                      ? "yellow"
                      : "green",
                }}
              >
                {task.priority}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(task.id)} disabled={loading}>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
                <IconButton disabled={loading}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TaskTable;
