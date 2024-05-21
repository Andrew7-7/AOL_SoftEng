import { useParams } from "react-router-dom";
import AdminNav from "../../../global/components/navbar/admin/adminNav";
import useFetch from "../../../global/hooks/useFetch";
import "./course_update_page.css";
import { ICourse } from "../../../global/model/course-interface";
import InputForm from "../../../global/components/textBox/InputForm";

const CourseUpdatePage = () => {
	const { courseId } = useParams();

	const { data, loading: courseLoading } = useFetch(
		`http://localhost:3002/course/getCourseById/${courseId}`
	);

	if (courseLoading) {
		return <AdminNav />;
	}

	const courseData: ICourse = data;

	console.log(courseData);

	return (
		<div className="course-update-page">
			<AdminNav />
			<div className="content-section">
				<div className="page-center">
					<div className="content-container">
						<div className="header">Update Course</div>
						<div className="content-left">
							{/* <InputForm
								label={"tes"}
								name="tes"
								onChange={() => {}}
								placeHolder="tes"
								type="text"
								value={""}
							/> */}
						</div>
						<div className="content-right"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseUpdatePage;
