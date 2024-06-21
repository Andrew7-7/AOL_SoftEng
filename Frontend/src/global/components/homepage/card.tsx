import { Link } from "react-router-dom";
import "./pupular_course_card.css";
import arrow from "../../assets/arrow.png";

export const Card2 = ({ id, img, title, session, chapter, link }: any) => {
  const imgUrl = img;
  const text = title;
  const sessions = session;
  const chapters = chapter;
  const docId = id;
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");

  return (
    <div className="globalCard">
      <Link to={`/activecourse/${docId}`}>
        <div className="card2">
          <div
            className="card-title"
            style={{
              backgroundImage: `url("${imgUrl}")`,
              backgroundSize: "125%",
            }}
          >
            <p>{text}</p>
          </div>
          <div className="card-text">
            <div className="card-text-detail">
              <p className="card-text-detail-number">{session}</p>
              <p className="card-text-detail-title">Sessions</p>
            </div>
            <div className="card-text-detail">
              <p className="card-text-detail-number">{chapters}</p>
              <p className="card-text-detail-title">Chapters</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const LastCard = () => {
  return (
    <div className="globalLastCard">
      <Link to="/activecourse">
        <div className="lastCard">
          <img src={arrow} />
          <p>View All</p>
        </div>
      </Link>
    </div>
  );
};
