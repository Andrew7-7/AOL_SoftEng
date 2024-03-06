import React from "react";
import './login_css.css'
import StudentNav from "../../../../public/components/navbar/student/student_navbar";
import salyPic from "../../../../public/assets/Saly-38.png"
const LoginPage = () => {
  return (
    <>
      <StudentNav />
      <div className="Outer">
        <div className="divContainer">
          <div className="leftDiv">
            <p>Login</p>
            <p>Welcome to StepCode</p>
            <input
              className="loginInput"
              type="text"
              placeholder="Email"
            ></input>
            <input
              className="loginInput"
              type="text"
              placeholder="Password"
            ></input>
            <button>Sign In</button>
          </div>
          <div className="rightDiv">
            <div className="innerRight">
              <img src={salyPic}></img>
              <p>Unleash Your Code Mastery</p>
              <p>
                Discover different kinds of programming language <br></br>with our
                experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
