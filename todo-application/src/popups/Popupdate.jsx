import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Radio from "@mui/material/Radio";
import { green, yellow, red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useParams } from "react-router-dom";

const Popupdate = () => {
  const [selectedValue, setSelectedValue] = useState("a");

  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3000/Tasks" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <form>
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
            value={data.task}
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
            // value={data.priority}
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
            // value={data.priority}
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
            // value={data.priority}
            name="radio-buttons"
            inputProps={{ "aria-label": "C" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="check">
            <CheckIcon />
          </IconButton>
        </Paper>
      </form>
    </>
  );
};

export default Popupdate;
