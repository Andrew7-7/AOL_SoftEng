import { useParams } from "react-router-dom";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import "./pick_tutor_page.css";
import useFetch from "../../../global/hooks/useFetch";

const PickTutorPage = () => {
	const { courseId } = useParams();

	const { data } = useFetch("http://localhost:3002/tutor/getTutors");

	console.log(data);

	return (
		<>
			<StudentNav />
			<div className="pick-tutor-page">
				<div className="page-center">
					<div className="pick-tutor-page-content">
						<div className="back-section"></div>
						<div className="card-section">
							<div className="header">Tutor List</div>
							<div className="dummy"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PickTutorPage;
