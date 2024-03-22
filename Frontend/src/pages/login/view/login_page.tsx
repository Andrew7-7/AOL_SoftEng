import React, { useState } from "react";
import "./login_css.css";

import { Link } from "react-router-dom";
import { handleChange } from "../../../global/controller/handleInput_change";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import BlueButton from "../../../global/components/button/blue_button/blue_button";
import Banner from "../../../global/components/loginRegister/banner/banner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  return (
    <>
      <StudentNav />
      <div className="Outer">
        <div className="divContainer">
          <div className="leftDiv">
            <p>Login</p>
            <p>Welcome to StepCode</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="loginInput"
                type="text"
                placeholder="Email"
                onChange={(event) => handleChange(event, setEmail)}
              ></input>
              <input
                className="loginInput"
                type="text"
                placeholder="Password"
                onChange={(event) => handleChange(event, setPass)}
              ></input>
            </div>
            <BlueButton
              text={"Sign In"}
              clickFunction={() => console.log(password)}
            />
            <p>
              Don't have any account yet? <Link to="/register">Register Now!</Link>
            </p>
          </div>
          <Banner />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
