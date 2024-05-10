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
import linkedinImage from "../../../global/assets/linkedin.png";
import loadingSvg from "../../../global/assets/Spin@1x-1.1s-200px-200px.svg";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { log } from "console";
import axios from "axios";

const ProfilePage = () => {
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const student = JSON.parse(window.localStorage.getItem("student") || "{}");
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [username, setUsername] = useState(user.username);
  const [instagram, setInstagram] = useState(student.instagram);
  const [facebook, setFacebook] = useState(student.facebook);
  const [linkedin, setLinkedin] = useState(student.linkedin);
  const [twitter, setTwitter] = useState(student.twitter);
  const [description, setDescription] = useState(student.aboutMe);
  const [downloadURL, setDownloadURL] = useState(student.profileURL);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const extraAuth =
    "aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k";

  const handleEditButton = () => {
    setEdit(!edit);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      // setLoading(true);
      setDownloadURL(loadingSvg);
    }
  };

  useEffect(() => {
    const handleUpload = async () => {
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("image", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3002/user/uploadProfilePicture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              auth: `Bearer ${extraAuth}`,
            },
          }
        );
        setDownloadURL(response.data.downloadURLs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    handleUpload();
  }, [selectedFile]);

  const buttonRef = useRef<HTMLInputElement>(null);
  const handleCLickPencil = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const editPopup = () => {
    const handleClickSave = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/user/updateStudent",
          {
            aboutMe: description,
            facebook,
            instagram,
            linkedin,
            twitter,
            email: user.email,
          },
          {
            headers: {
              auth: `Bearer ${extraAuth}`,
            },
          }
        );
        if (res.status === 200) {
          window.localStorage.removeItem("student");
          window.localStorage.setItem(
            "student",
            JSON.stringify(res.data.studentProfile)
          );
          handleEditButton();
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    return (
      <div className="blurBackground">
        <div className="editPopup">
          <InputComponent
            title="Username"
            setFunction={setUsername}
            val={username}
          />
          <InputComponent
            title="Instagram"
            setFunction={setInstagram}
            val={instagram}
          />
          <InputComponent
            title="Facebook"
            setFunction={setFacebook}
            val={facebook}
          />
          <InputComponent
            title="Twitter"
            setFunction={setTwitter}
            val={twitter}
          />
          <InputComponent
            title="LinkedIn"
            setFunction={setLinkedin}
            val={linkedin}
          />
          <InputComponent
            title="About Me"
            setFunction={setDescription}
            val={description}
          />
          <div className="saveDiv">
            <button className="cancelButton" onClick={handleEditButton}>
              Cancel
            </button>
            <button className="saveButton" onClick={handleClickSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
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
                <img className="profileImage" src={downloadURL}></img>
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
                <SocialMedia
                  link={`https://www.instagram.com/${instagram}`}
                  image={igImage}
                />
                <SocialMedia
                  link={`https://www.facebook.com/${facebook}`}
                  image={facebookImage}
                />
                <SocialMedia
                  link={`https://www.twitter.com/${twitter}`}
                  image={twitterImage}
                />
                <SocialMedia
                  link={`https://www.linkedin.com/${linkedin}`}
                  image={linkedinImage}
                />
              </div>
            </div>
            <div className="education">
              <p className="subTitle">Education</p>
            </div>
          </div>

          <div className="profileBottom">
            <p className="subTitle">About Me</p>
            <div style={{ display: "flex", alignItems: "end" }}>
              <div className="description">{description}</div>
              <button onClick={handleEditButton} className="editProfileButton">
                <img src={pencilImage} width={"20px"}></img>
              </button>
            </div>
          </div>
        </div>
      </div>
      {edit == true ? editPopup() : null}
    </>
  );
};

const SocialMedia = ({ image, link }: { image: string; link: string }) => {
  return (
    <a href={link} target="_blank">
      <img src={image} width={"30px"} style={{ marginRight: "10px" }}></img>
    </a>
  );
};

const InputComponent = ({
  setFunction,
  val,
  title,
}: {
  setFunction: Function;
  val: string;
  title: string;
}) => {
  return (
    <div className="inputComponent">
      <p className="inputTitle">{title}</p>
      <input
        className="inputBox"
        type="text"
        value={val}
        onChange={(event) => {
          setFunction(event.target.value);
        }}
      />
    </div>
  );
};

export default ProfilePage;
