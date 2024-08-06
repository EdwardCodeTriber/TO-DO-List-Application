import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Components/main.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Popadd from "../popups/Popadd";
import Popupdate from "../popups/Popupdate";
import axios from "axios";

const Main = () => {
  const navigate = useNavigate();
  // pop up function if true
  const [popadd, setPopadd] = useState(false);
  const toggleModal = () => {
    setPopadd(!popadd);
  };
  // pop up function if true
  const [popup, setPopupdate] = useState(false);
  const toggleUpdate = () => {
    setPopupdate(!popup);
  };

  const handleSubmit = () => {
    e.preventDefault();
    navigate("/Login");
  };

  // fetch function with an empty arry, to be used later on if items or tasks need to be updated
  // renders the first time when the app'ion runs
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Tasks")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <h1>Welcome</h1>

          <p></p>

          <div className="profile">Your profile</div>

          <div className="number">Number Of Tasks</div>
          <div className="links">
            <Button variant="outlined">
              <Link to="/Updateprofile">Update profile</Link>
            </Button>
            <Button variant="outlined" onClick={handleSubmit}>
              Sign Out
            </Button>
          </div>
        </div>
        <div className="my-dash">
          <h1>My Dashboard</h1>
          <div className="task-add">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Tasks"
                inputProps={{ "aria-label": "search Tasks" }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                {/*Need to add a search function*/}
                <SearchIcon />
              </IconButton>
            </Paper>

            {/* Need to add a add function */}
            <div className="add">
              <Button variant="outlined" onClick={toggleModal}>
                Add Task
              </Button>
            </div>
            {/* Return a pop up */}
            {popadd && <Popadd />}
            {popup && <Popupdate />}
            <div className="table">
              <TableContainer component={Paper} elevation={3}>
                <Table
                  sx={{ minWidth: 150 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Task Description</TableCell>
                      <TableCell align="right">Priority level</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((tabledata, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{tabledata.id}</TableCell>
                        <TableCell align="right">{tabledata.task}</TableCell>
                        <TableCell align="right">
                          {tabledata.priority}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={toggleUpdate}
                            sx={{ p: "10px" }}
                            aria-label="edit"
                          >
                            {/*Need to Edit function*/}
                            <EditIcon  />
                          </IconButton>
                          <IconButton
                            type="submit"
                            sx={{ p: "10px", color: "red" }}
                            aria-label="delete"
                          >
                            {/*Need to Delete function*/}
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
