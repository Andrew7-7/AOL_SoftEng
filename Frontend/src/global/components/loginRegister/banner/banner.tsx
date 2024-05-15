import salyPic from "../../../assets/Saly-38.png";
import './banner.css'
const Banner = () => {
  return (
    <div className="rightDiv">
      <div className="innerRight">
        <img className="salyPic" src={salyPic}></img>
        <p className="bannerTitle">Unleash Your Code Mastery</p>
        <p className="bannerSubtitle">
          Discover different kinds of programming language <br></br>with our
          experts
        </p>
      </div>
    </div>
  );
};

export default Banner;
