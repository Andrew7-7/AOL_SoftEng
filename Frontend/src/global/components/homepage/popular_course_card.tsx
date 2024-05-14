import "./pupular_course_card.css";

export const Card = ({img, title, session, chapter}:any) => {

  const imgUrl = (img);
  const text = (title);
  const sessions = (session);
  const chapters= (chapter);

  return (
    <>
      <div className="card">
        <div 
          className="card-title" 
          style = {
            {backgroundImage: `url("${imgUrl}")`}
          }>
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
    </>
  );
};
