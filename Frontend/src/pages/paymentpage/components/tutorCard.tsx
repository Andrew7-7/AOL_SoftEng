import { Link } from "react-router-dom";
import "./tutorCard.css";
import starIcon from "../../../global/assets/star.png"

export const TutorCard = ({ img, name, reviewLength, rating, price }: any) => {
  const imgUrl = img;
  const text = name;
  const review = reviewLength;
  const ratings = rating;
  const pricepercourse = price;

  function formatNumberWithDotSeparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  }

  function NumberWithDotSeparator({ number }) {
    return (
      <span>
        {formatNumberWithDotSeparator(number)}
      </span>
    );
  }

  return (
    <>
      <div className="card-tutor">
        <div
          className="card-title-tutor"
          style={{ backgroundImage: `url("${imgUrl}")`, backgroundSize: "100%" }}
        >
          <p>{text}</p>
        </div>
        <div className="card-text-tutor">
          <div className="card-text-detail-tutor-1-container">
            <div className="card-text-star-img">
              <img src={starIcon} alt="" />
            </div>
            <div className="card-text-rating">{ratings}</div>
            <div className="card-text-review-count">({review})</div>
          </div>
          <div className="card-text-detail-tutor-2-container">
            <div className="card-text-price-per-course">Rp. {pricepercourse && (
              <span>{formatNumberWithDotSeparator(pricepercourse)}</span>
            )} / Course</div>
          </div>
        </div>
      </div>
    </>
  );
};
