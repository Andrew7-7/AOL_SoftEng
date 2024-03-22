import React from "react";
import "./studentNav_css.css";
import { Link } from "react-router-dom";

const StudentNav = () => {
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  return (
    <div className="navContainer">
      <Link to={"/"} className="leftNav">
        <p style={{ color: "#E24E03" }}>STEP</p>
        <p>CODE</p>
      </Link>
      <div className="rightNav">
        {user.username ? (
          <p>{user.username}</p>
        ) : (
          <Link to={"/login"}>Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default StudentNav;
