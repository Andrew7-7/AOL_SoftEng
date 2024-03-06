import React, { useState } from "react";
import "./login_css.css";
import StudentNav from "../../../components/navbar/student/student_navbar";
import BlueButton from "../../../components/button/blue_button/blue_button";
import salyPic from "../../../assets/Saly-38.png";
import { Link } from "react-router-dom";
import { handleChange } from "../controller/handleInput_change";
const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPass] = useState('');
  
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
            <BlueButton text={"Sign In"} clickFunction={()=>console.log(password)
            } />
            <p>
              Don't have any account yet? <Link to="/">Register Now</Link>
            </p>
          </div>
          <div className="rightDiv">
            <div className="innerRight">
              <img src={salyPic}></img>
              <p>Unleash Your Code Mastery</p>
              <p>
                Discover different kinds of programming language <br></br>with
                our experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
