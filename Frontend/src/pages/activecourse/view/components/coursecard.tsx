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
        <div className="card-activecourse">
          <div
            className="card-title-activecourse"
            style={{ backgroundImage: `url("${imgUrl}")`, backgroundSize: "120%" }}
          >
            <span>Popular</span>
            <p>{text}</p>
          </div>

          <div className="card-text-activecourse">
            <div className="card-text-detail-activecourse">
              <p className="card-text-detail-number-activecourse">{sessions}</p>
              <p className="card-text-detail-title-activecourse">Sessions</p>
            </div>
            <div className="card-text-detail-activecourse">
              <p className="card-text-detail-number-activecourse">{chapters}</p>
              <p className="card-text-detail-title-activecourse">Chapters</p>
            </div>
          </div>

        </div>
      </Link>
    </>
  );
};
