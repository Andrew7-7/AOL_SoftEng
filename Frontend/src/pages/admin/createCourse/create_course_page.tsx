import { ChangeEvent, useState } from "react";
import AdminNav from "../../../global/components/navbar/admin/adminNav";
import InputForm from "../../../global/components/textBox/InputForm";
import "./create_course.css";
import SelectForm from "../../../global/components/selectForm/SelectForm";

const CreateCoursePage = () => {
	const [courseFormData, setCourseFormData] = useState({
		courseName: "",
		courseDescription: "",
		skill: "",
		hourPerSession: "",
	});

	const skillLevelOption = [
		{
			id: "Beginer",
			name: "Beginer",
		},
		{
			id: "Intermediate",
			name: "Intermediate",
		},
		{
			id: "Advanced",
			name: "Advanced",
		},
	];

	const handleInputChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = event.target;

		if (name === "hourPerSession") {
			const num = parseFloat(value);
			if (num < 1) {
				setCourseFormData((prevData) => ({
					...prevData,
					[name]: "1", // Set the value to 1 if it is less than 1
				}));
				return;
			}
		}

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
									<SelectForm
										label="Select skill level"
										name="skill"
										onChange={handleInputChange}
										value={courseFormData.skill}
										options={skillLevelOption}
									/>
									<InputForm
										label="Hour per session"
										name="hourPerSession"
										onChange={handleInputChange}
										placeHolder="Insert hour per session"
										type="number"
										value={courseFormData.hourPerSession}
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
