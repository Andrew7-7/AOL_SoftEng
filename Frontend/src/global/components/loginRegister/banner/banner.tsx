import salyPic from "../../../assets/Saly-38.png";
import './banner.css'
const Banner = () => {
  return (
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
  );
};

export default Banner;
