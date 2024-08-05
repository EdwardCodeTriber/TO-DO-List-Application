import React from "react";
import "../Components/Landing.css";
import { Link } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className="content">
      <h1 className="landing"> To Do list </h1>
      <div>
        <img src=""></img>
      </div>
      <p>
        This todo list web-app was made to keep tract of multiple task 
      </p>
      <div className="links">
        <Link to="/Login"> Login</Link> <p>or</p> <Link to="/Register"> Sign Up</Link>
      </div>
    </div>
  );
};

export default Landingpage;
