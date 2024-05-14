import React from "react";
import "./student_reviews.css";
import Review from "./review";

const StudentReviews: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {
	console.log(reviews);

	return (
		<div className="student-reviews-container">
			<div className="header">Ratings & reviews</div>
			{reviews.map((review) => (
				<Review review={review} key={review.id} />
			))}
		</div>
	);
};

export default StudentReviews;
