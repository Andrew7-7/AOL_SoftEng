import { useState } from "react";
import BlueButton from "../../../global/components/button/blue_button/blue_button";
import Banner from "../../../global/components/loginRegister/banner/banner";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import { handleChange } from "../../../global/controller/handleInput_change";
import { Link, useNavigate } from "react-router-dom";
import "./register_css.css";
import handleRegister from "../controller/register_controller";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <StudentNav />
      <div className="Outer">
        <div className="divContainer">
          <Banner />
          <div className="leftDiv">
            <p>Register</p>
            <p>Welcome to StepCode</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="loginInput"
                type="text"
                placeholder="Username"
                onChange={(event) => handleChange(event, setUsername)}
              ></input>
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
              <input
                className="loginInput"
                type="text"
                placeholder="Confirm Password"
                onChange={(event) => handleChange(event, setConPassword)}
              ></input>
            <p className="error">{error}</p>
            </div>
            <BlueButton
              text={"Register"}
              clickFunction={() =>
                handleRegister(
                  username,
                  email,
                  password,
                  conPassword,
                  setError,
                  navigate
                )
              }
            />
            <p>
              Already have an account? <Link to="/login">Login Now!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
