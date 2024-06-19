import { Link, useParams } from "react-router-dom";
import useFetch from "../../../global/hooks/useFetch";
import "./tutor_detail_page.css";
import TutorDetail from "../components/tutor_detail";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import StudentReviews from "../components/student_reviews";
import { ITutor } from "../../../global/model/tutor-interface";

const TutorDetailPage = () => {
	const { courseId, tutorId } = useParams();

	const { data: tutorData, loading: tutorLoading } = useFetch(
		`http://localhost:3002/tutor/getTutor/${tutorId}`
	);

	if (tutorLoading) {
		return <div></div>;
	}

	console.log(tutorData);

	return (
		<>
			<StudentNav />
			<div className="tutor-detail-page">
				<div className="page-center">
					<div className="tutor-detail-page-content">
						<div className="left-section">
							<TutorDetail tutorData={tutorData} />
							<StudentReviews reviews={tutorData.reviews} />
						</div>
						<div className="right-section">
							<div className="container">
								<div className="header">Contact {tutorData.name}</div>
								<div className="button-container">
									<Link to={`/${courseId}/${tutorId}/payment`}>
										<div className="button-orange">Book</div>
									</Link>
								</div>
								<div className="button-container">
									<Link to={`/chat/${tutorId}`}>
										<div className="button-orange">Chat</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TutorDetailPage;
