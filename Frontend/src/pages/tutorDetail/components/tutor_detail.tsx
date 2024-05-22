import React, { useState } from "react";
import { ITutor } from "../../../global/model/tutor-interface";
import starIcon from "../../../global/assets/star.png";

import "./tutor_detail.css";

const TutorDetail: React.FC<{ tutorData: ITutor }> = ({ tutorData }) => {
	const [showAllSKills, setShowAllSkills] = useState<boolean>(false);

	const handleToggleSkills = () => {
		setShowAllSkills(!showAllSKills);
	};

	const displayedSkills: string[] = showAllSKills
		? tutorData.skillSet
		: tutorData.skillSet.slice(0, 6);

	return (
		<div className="tutor-detail-container">
			<div className="content-top">
				<div className="left">
					<img src={tutorData.profilePictureURL} alt="" />
				</div>
				<div className="right">
					<div className="top">
						<p>{tutorData.name}</p>
						<div className="rating-container">
							<img src={starIcon} alt="" />
							<p>
								{tutorData.rating == null ? "-" : tutorData.rating.toFixed(1)} /
								5 ({tutorData.reviews.length})
							</p>
						</div>
					</div>
					<div className="bottom">
						<p>Skill set</p>
						<div className="skill-set-container">
							{displayedSkills.map((skill, index) => (
								<div className="skill-set" key={index}>
									{skill}
								</div>
							))}
						</div>
						{tutorData.skillSet.length > 6 && (
							<div className="view-more-button" onClick={handleToggleSkills}>
								{showAllSKills ? "View Less" : "View More"}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="content-bottom">
				<div className="header">About me</div>
				<div className="tutor-description">{tutorData.description}</div>
			</div>
		</div>
	);
};

export default TutorDetail;
