import { Link } from "react-router-dom";
import { ITutor } from "../../../global/model/tutor-interface";
import starIcon from "../../../global/assets/star.png";
import "./tutor_card.css";
import { useState } from "react";

const TutorCard: React.FC<{ tutorData: ITutor }> = ({ tutorData }) => {
	const skillSet = tutorData.skillSet?.join(", ");

	const [showAllDescription, setShowAllDescription] = useState<boolean>(false);

	const handleToggleDescription = () => {
		setShowAllDescription(!showAllDescription);
	};

	const displayedDescription: string = showAllDescription
		? tutorData.description
		: tutorData.description.slice(0, 420);

	return (
		<div className="tutor-card-container">
			<div className="tutor-card-picture">
				<img src={tutorData.profilePictureURL} alt="" />
			</div>
			<div className="tutor-card-content">
				<div className="tutor-card-content-left">
					<div className="top-container">
						<div className="tutor-name">{tutorData.name}</div>
						<div className="rating-container">
							<img src={starIcon} alt="" />
							<p>
								{tutorData.rating == null ? "-" : tutorData.rating.toFixed(1)} /
								5 ({tutorData.reviews.length})
							</p>
						</div>
					</div>
					<div className="tutor-skill-set">{skillSet}</div>
					<div className="tutor-description">
						{displayedDescription}{" "}
						{tutorData.description.length > 420 && (
							<div
								className="view-more-button"
								onClick={handleToggleDescription}
							>
								{showAllDescription ? "View Less" : "View More"}
							</div>
						)}
					</div>
				</div>
				<div className="tutor-card-content-right">
					<Link to={`/pickTutor/${tutorData.id}`} className="button-container">
						<div className="button-orange">View profile</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default TutorCard;
