import { Link, useNavigate } from "react-router-dom";
import permissionImage from "../../../assets/key.png";
import accountImage from "../../../assets/account.png";
import reportImage from "../../../assets/report.png";
import courseImage from "../../../assets/online-learning.png";
import signOutImage from "../../../assets/logout.png";
import chatImage from "../../../assets/chatIcon.png";
import "./tutorNav_css.css";
import { useState } from "react";
const TutorNav = ({ clickedItem }: { clickedItem: string }) => {
  const [clicked, setClicked] = useState(clickedItem);
  const navigate = useNavigate();
  const signOut = () => {
    window.localStorage.removeItem("accToken");
    window.localStorage.removeItem("profile");
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  const NavigationLabel = ({
    image,
    title,
    link,
  }: {
    image: string;
    title: string;
    link: string;
  }) => {
    return (
      <Link to={link}>
        <div
          onClick={() => setClicked(title)}
          className={`tutornavLabel ${clicked === title ? "clicked" : ""}`}
        >
          <img className="tutornavLabelImage" src={image}></img>
          <p>{title}</p>
        </div>
      </Link>
    );
  };
  return (
    <div className="tutorNav">
      <div className="tutorNavTitle">
        <p style={{ color: "#E24E03" }}>STEP</p>
        <p>CODE</p>
      </div>
      <div>
        <NavigationLabel
          image={permissionImage}
          title="Course Lists"
          link="/applyCourse"
        />
        <NavigationLabel
          image={accountImage}
          title="Wallet"
          link="/walletPage"
        />
        <NavigationLabel
          image={reportImage}
          title="Active Class"
          link="/activeClass"
        />
        <NavigationLabel image={chatImage} title="Chat" link="/chat/x" />
      </div>
      <div onClick={signOut} className="signOutTutor">
        <img className="tutornavLabelImage" src={signOutImage}></img>
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default TutorNav;
