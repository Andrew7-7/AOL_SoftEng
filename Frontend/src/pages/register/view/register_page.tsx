import { useEffect, useRef, useState } from "react";
import BlueButton from "../../../global/components/button/blue_button/blue_button";
import Banner from "../../../global/components/loginRegister/banner/banner";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import { handleChange } from "../../../global/controller/handleInput_change";
import { Link, useNavigate } from "react-router-dom";
import "./register_css.css";
import handleRegister from "../controller/register_controller";
import axios from "axios";
import showImage from "../../../global/assets/view.png";
import hideImage from "../../../global/assets/hide.png";
import CountdownTimer from "../../../global/components/countDown/countDown";
import loadingSVG from "../../../global/assets/Spin@1x-1.1s-200px-200px.svg";
import Footer from "../../../global/components/footer/Footer";
const RegisterPage = () => {
  const extraAuth =
    "aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");
  const [errorOTP, setErrorOTP] = useState("");
  const [otpPopup, setOtpPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [conPassVisible, setConPassVisible] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate();
  const OtpInput = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    useEffect(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, []);
    const handleChangeOTP = async (
      index: number,
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const val = e.target.value;
      if (val.length == 0) return;

      const newOTP = [...otp];
      newOTP[index] = val.substring(val.length - 1);
      setOtp(newOTP);

      const combinedOTP = newOTP.join("");

      if (combinedOTP.length === 4) {
        try {
          const res = await axios.post(
            "http://localhost:3002/otp/checkOTP",
            { email, otp: combinedOTP },
            {
              headers: {
                auth: `Bearer ${extraAuth}`,
              },
            }
          );

          if (res.status === 200) {
            setOtpPopup(false);
            handleRegister(
              username,
              email,
              password,
              conPassword,
              setError,
              navigate,
              setLoading
            );
          }
        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            setErrorOTP(error.response.data.message);
          } else {
            throw error;
          }
        }
      }

      if (val && index < 4 - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    };
    const handleClick = (index: number) => {};
    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (
        e.key === "Backspace" &&
        !otp[index] &&
        index > 0 &&
        inputRefs.current[index - 1]
      ) {
        inputRefs.current[index - 1]?.focus();
      }
    };
    return (
      <div className="otpInputBlur">
        <div className="otpInputDiv">
          <b style={{ fontSize: "20px" }}>Enter OTP sent to {email}</b>
          <p
            onClick={handleOTP}
            style={{ color: "#E24E03", cursor: "pointer" }}
          >
            Resend OTP
          </p>
          <CountdownTimer resetKey={resetKey} />
          <div className="otpInputBox">
            {otp.map((value, index) => {
              return (
                <input
                  ref={(input) => (inputRefs.current[index] = input)}
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => handleChangeOTP(index, e)}
                  onClick={() => handleClick(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otpInput"
                />
              );
            })}
          </div>
          <p>
            Didn't get any email? <b>Check your spam folder</b>
          </p>
          <p style={{ color: "red" }}>{errorOTP}</p>
          <button
            className="cancelOTPButton"
            onClick={() => {
              setOtpPopup(false),
                setLoading(false),
                setError(""),
                setErrorOTP("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const handleOTP = async () => {
    if (!username || !email || !password || !conPassword) {
      setError("All fields must be filled");
      return;
    }

    if (password !== conPassword) {
      setError("confirm password must be the same as the password");
      return;
    }
    setError("");
    setErrorOTP("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3002/otp/sendOTP",
        { email },
        {
          headers: {
            auth: `Bearer ${extraAuth}`,
          },
        }
      );

      if (res.status === 200) {
        setOtpPopup(true);
        setResetKey((prev) => prev + 1);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        throw error;
      }
      throw error;
    }
  };
  return (
    <>
      {otpPopup == true ? <OtpInput /> : null}
      <StudentNav />

      <div className="Outer">
        <div className="divContainer">
          <Banner />
          <div className="leftDiv">
            {loading === true ? (
              // <img src={loadingSVG}></img>
              <p>Loading...</p>
            ) : (
              <>
                <p className="loginTitle">Register</p>
                <p className="welcomeText">Welcome to StepCode</p>
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
                  <div className="passDiv">
                    <input
                      className="loginInput"
                      type={conPassVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={conPassword}
                      onChange={(event) => handleChange(event, setConPassword)}
                    ></input>
                    <img
                      className="passVisibleIcon"
                      src={conPassVisible ? showImage : hideImage}
                      onClick={() => setConPassVisible(!conPassVisible)}
                    ></img>
                  </div>
                  <p className="error">{error}</p>
                </div>
                <BlueButton text={"Register"} clickFunction={handleOTP} />
                <p className="bottomText">
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#899096" }}>
                    Login Now!
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
