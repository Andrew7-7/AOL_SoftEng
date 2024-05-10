import { Link } from "react-router-dom";
import { ITutor } from "../../../global/model/tutor-interface";
import "./tutor_card.css";

const TutorCard: React.FC<{ tutorData: ITutor }> = ({ tutorData }) => {
  const skillSet = tutorData.skillSet?.join(", ");

  return (
    <div className="tutor-card-container">
      <div className="tutor-card-picture">
        <img src={tutorData.profilePictureURL} alt="" />
      </div>
      <div className="tutor-card-content">
        <div className="tutor-card-content-left">
          <div className="tutor-name">{tutorData.name}</div>
          <div className="tutor-skill-set">{skillSet}</div>
          <div className="tutor-description">{tutorData.description}</div>
        </div>
        <div className="tutor-card-content-right">
          <Link to={"/"} className="button-container">
            <div className="button-orange">View profile</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
