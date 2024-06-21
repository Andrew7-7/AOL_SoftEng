import { Link } from "react-router-dom";
import "./coursecard.css";

export const Card = ({ id, img, title, session, chapter, type }: any) => {
  const imgUrl = img;
  const text = title;
  const sessions = session;
  const chapters = chapter;
  const docId = id;
  const courseType = type;

  return (
    <>
      <Link to={`/activecourse/${docId}`}>
        <div className="card-activecourse">
          <div
            className="card-title-activecourse"
            style={{ backgroundImage: `url("${imgUrl}")`, backgroundSize: "120%" }}
          >
            {courseType && <span>{courseType}</span>}
            {courseType && <p>{text}</p>}
            {!courseType && <h1 className="noncoursetype-coursecard">{text}</h1>}

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
