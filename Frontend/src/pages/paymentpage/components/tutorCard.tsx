import { Link } from "react-router-dom";
import "./tutorCard.css";

export const TutorCard = ({ id, img, title, session, chapter, link }: any) => {
  const imgUrl = img;
  const text = title;
  const sessions = session;
  const chapters = chapter;
  const docId = id;

  return (
    <>
      <div className="card">
        <div
          className="card-title"
          style={{ backgroundImage: `url("${imgUrl}")`, backgroundSize: "120%" }}
        >
          <p>{text}</p>
        </div>
        <div className="card-text">
          <div className="card-text-detail">
            <p className="card-text-detail-number">{sessions}</p>
            <p className="card-text-detail-title">Rating</p>
          </div>
          <div className="card-text-detail">
            <p className="card-text-detail-number">{chapters}</p>
            <p className="card-text-detail-title">Reviews</p>
          </div>
        </div>
      </div>
    </>
  );
};
