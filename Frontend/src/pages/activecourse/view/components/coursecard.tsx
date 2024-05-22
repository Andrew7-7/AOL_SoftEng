import { Link } from "react-router-dom";
import "./coursecard.css";

export const Card = ({ id, img, title, session, chapter, link }: any) => {
  const imgUrl = img;
  const text = title;
  const sessions = session;
  const chapters = chapter;
  const docId = id;

  return (
    <>
      <Link to={`/activecourse/${docId}`}>
        <div className="card">
          <div
            className="card-title"
            style={{ backgroundImage: `url("${imgUrl}")`, backgroundSize: "120%" }}
          >
            <span>Popular</span>
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
