import { Link } from "react-router-dom";
import "./pupular_course_card.css";
import arrow from "../../assets/arrow.png";

export const Card = ({ img, title, session, chapter, link }: any) => {
  const imgUrl = img;
  const text = title;
  const sessions = session;
  const chapters = chapter;

  return (
    <>
      <Link to="/">
        <div className="card">
          <div
            className="card-title"
            style={{ backgroundImage: `url("${imgUrl}")` }}
          >
            <p>{text}</p>
          </div>
          <div className="card-text">
            <div className="card-text-detail">
              <p className="card-text-detail-number">{sessions}</p>
              <p className="card-text-detail-title">Sessions</p>
            </div>
            <div className="card-text-detail">
              <p className="card-text-detail-number">{chapters}</p>
              <p className="card-text-detail-title">Chapters</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export const LastCard = () => {
  return (
    <>
      <Link to="/activecourse">
        <div className="lastCard">
          <img src={arrow} />
          <p>View All</p>
        </div>
      </Link>
    </>
  );
};
