import { useParams } from "react-router-dom";
import AdminNav from "../../../global/components/navbar/admin/adminNav";
import useFetch from "../../../global/hooks/useFetch";
import "./course_update_page.css";

const CourseUpdatePage = () => {
	const { courseId } = useParams();

	const { data: courseData, loading: courseLoading } = useFetch(
		`http://localhost:3002/course/getCourseById/${courseId}`
	);

	if (courseLoading) {
		return <AdminNav />;
	}

	console.log(courseData);

	return (
		<div className="course-update-page">
			<AdminNav />
			<div className="content-section">
				<div className="page-center">
					<div className="content-container">tes</div>
				</div>
			</div>
		</div>
	);
};

export default CourseUpdatePage;
