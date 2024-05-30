import { ChangeEvent, useState } from "react";
import AdminNav from "../../../global/components/navbar/admin/adminNav";
import InputForm from "../../../global/components/textBox/InputForm";
import "./create_course.css";

const CreateCoursePage = () => {
	const [courseFormData, setCourseFormData] = useState({
		courseName: "",
		courseDescription: "",
	});

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setCourseFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<div className="create-course-page">
			<AdminNav clickedItem="Course" />
			<div className="content-section">
				<div className="page-center">
					<div className="content-container">
						<div className="header-section">
							<div className="header">Create Course</div>
							<form className="form-container">
								<div className="left">
									<InputForm
										label="Course name"
										name="courseName"
										onChange={handleInputChange}
										placeHolder="Insert course name"
										type="text"
										value={courseFormData.courseName}
									/>
									<InputForm
										label="Course description"
										name="courseDescription"
										onChange={handleInputChange}
										placeHolder="Insert course description"
										type="textarea"
										value={courseFormData.courseDescription}
									/>
								</div>
								<div className="right"></div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCoursePage;
