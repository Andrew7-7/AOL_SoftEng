import useFetch from "../../../global/hooks/useFetch";
import starIcon from "../../../global/assets/star.png";
import "./review.css";

const Review: React.FC<{ review: IReview }> = ({ review }) => {
	const { data: userData, loading: userLoading } = useFetch(
		`http://localhost:3002/user/getUserById/${review.studentId}`
	);

	if (userLoading) {
		return <div></div>;
	}

	console.log(userData);

	return (
		<div className="review-container">
			<div className="left">
				<img
					src={
						userData.studentData.profileURL != ""
							? userData.studentData.profileURL
							: "https://firebasestorage.googleapis.com/v0/b/aolsofteng.appspot.com/o/Profile%2Fanonymous_profilce_picture.webp?alt=media&token=24c17cb1-3032-432f-a1a1-98c7d9fbff06"
					}
					alt=""
				/>
			</div>
			<div className="right">
				<div className="name">{userData.username}</div>
				<div className="rating-container">
					<img src={starIcon} alt="" />
					<p>{review.rating} / 5</p>
				</div>
				<div className="comment">{review.comment}</div>
			</div>
		</div>
	);
};

export default Review;
