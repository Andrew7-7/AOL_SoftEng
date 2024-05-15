import React, { useState } from "react";
import "./login_css.css";

import { Link, useNavigate } from "react-router-dom";
import { handleChange } from "../../../global/controller/handleInput_change";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import BlueButton from "../../../global/components/button/blue_button/blue_button";
import Banner from "../../../global/components/loginRegister/banner/banner";
import handleLogin from "../controller/login_controller";
import showImage from "../../../global/assets/view.png";
import hideImage from "../../../global/assets/hide.png";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <StudentNav />
      <div className="Outer">
        <div className="divContainer">
          <div className="leftDiv">
            <p className="loginTitle">Login</p>
            <p className="welcomeText">Welcome to StepCode</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="loginInput"
                type="text"
                placeholder="Email"
                onChange={(event) => handleChange(event, setEmail)}
              ></input>
              <div className="passDiv">
                <input
                  className="loginInput"
                  type={passVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => handleChange(event, setPass)}
                ></input>
                <img
                  className="passVisibleIcon"
                  src={passVisible ? showImage : hideImage}
                  onClick={() => setPassVisible(!passVisible)}
                ></img>
              </div>
              <p className="error">{error}</p>
            </div>
            <BlueButton
              text={"Sign In"}
              clickFunction={() =>
                handleLogin(email, password, setError, navigate)
              }
            />
            <p className="bottomText">
              Don't have any account yet?{" "}
              <Link to="/register" style={{ color: "#899096" }}>
                Register Now!
              </Link>
            </p>
          </div>
          <Banner />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
