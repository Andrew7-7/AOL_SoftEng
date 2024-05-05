import { useNavigate } from "react-router-dom";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import logout from "../controller/logout";
import "./profile_css.css";
import editImage from "../../../global/assets/photo-camera.png";
import helloImage from "../../../global/assets/groundhog.png";
import emailImage from "../../../global/assets/email.png";
import igImage from "../../../global/assets/instagram.png";
import facebookImage from "../../../global/assets/facebook.png";
import twitterImage from "../../../global/assets/twitter.png";
import pencilImage from "../../../global/assets/Vector.png";
import { useRef, useState } from "react";

const ProfilePage = () => {
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [loading, setLoading] = useState(true);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      // setLoading(true);
    }
  };

  const buttonRef = useRef<HTMLInputElement>(null);
  const handleCLickPencil = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };
  return (
    <>
      <StudentNav />
      <input
        onChange={handleFileChange}
        ref={buttonRef}
        type="file"
        style={{ visibility: "hidden", position: "fixed" }}
      ></input>
      <div className="Container">
        <div className="leftDivProfile">
          <p className="welcomeTitle">Welcome back!</p>
          <img className="helloImage" src={helloImage}></img>
          <button className="signOutButton" onClick={() => logout(navigate)}>
            Sign Out
          </button>
        </div>
        <div className="rightDivProfile">
          <p className="profileTitle">Profile</p>
          <div className="profileUpper">
            <div className="forPencilDiv">
              <div className="profileImageContainer">
                <img className="profileImage" src={helloImage}></img>
              </div>
              <img
                className="pencilImage"
                src={editImage}
                width={"30px"}
                onClick={handleCLickPencil}
              ></img>
            </div>
            <div className="profileIntro">
              <p className="profileUsername">{user.username}</p>
              <p>{user.role}</p>
              <div style={{ display: "flex" }}>
                <img
                  src={emailImage}
                  width={"20px"}
                  style={{ marginRight: "1vw" }}
                ></img>
                {user.email}
              </div>
            </div>
          </div>

          <div className="profileMiddle">
            <div className="socialMedia">
              <p className="subTitle">Social Media</p>
              <div>
                <img
                  src={igImage}
                  width={"30px"}
                  style={{ marginRight: "10px" }}
                ></img>
                <img
                  src={facebookImage}
                  width={"30px"}
                  style={{ marginRight: "10px" }}
                ></img>
                <img
                  src={twitterImage}
                  width={"30px"}
                  style={{ marginRight: "10px" }}
                ></img>
              </div>
            </div>
            <div className="education">
              <p className="subTitle">Education</p>
            </div>
          </div>

          <div className="profileBottom">
            <p className="subTitle">About Me</p>
            <div style={{ display: "flex", alignItems: "end" }}>
              <div className="description">
                Hi, I’m very curious about all of the programming languages out
                there.
              </div>
              <button className="editProfileButton">
                <img src={pencilImage} width={"20px"}></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
