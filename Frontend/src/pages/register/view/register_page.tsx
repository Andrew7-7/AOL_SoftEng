import { useState } from "react";
import BlueButton from "../../../global/components/button/blue_button/blue_button";
import Banner from "../../../global/components/loginRegister/banner/banner";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import { handleChange } from "../../../global/controller/handleInput_change";
import { Link } from "react-router-dom";

const RegisterPage = () => {
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
              Don't have any account yet? <Link to="/">Register Now</Link>
            </p>
          </div>
          <Banner />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
