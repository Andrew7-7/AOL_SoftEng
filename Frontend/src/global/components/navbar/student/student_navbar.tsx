import React from "react";
import "./studentNav_css.css";
import { Link } from "react-router-dom";

const StudentNav = () => {
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  return (
    <div className="navContainer">
      <Link to={"/"} className="leftNav" style={{ fontWeight: "bold" }}>
        <p style={{ color: "#E24E03" }}>STEP</p>
        <p>CODE</p>
      </Link>
      <div className="rightNav">
        <Link to={"/activeCourse"}>Course</Link>
        <Link to={"/reply"}>Forum</Link>
        <Link to={"/chat"}>Chat</Link>
        <div className="profile">
          {user.username ? (
            user.role === "tutor" ? (
              <Link to={"/activeClass"}>Tutor Page</Link>
            ) : user.role === "admin" ? (
              <Link to={"/accountManagement"}>Admin Page</Link>
            ) : (
              <Link to={"/profile"}>{user.username}</Link>
            )
          ) : (
            <Link to={"/login"}>Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentNav;
