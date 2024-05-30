import React from "react";
import "./course_table.css";
import { ICourse } from "../../../../global/model/course-interface";
import { Link } from "react-router-dom";

const CourseTable: React.FC<{ courseDatas: ICourse[] }> = ({ courseDatas }) => {
	return (
		<div className="course-table-container">
			<div className="table-content">
				<div className="table-header">
					<p>Name</p>
					<p>Status</p>
					<p>Chapters</p>
					<p>Total Hours</p>
					<p>Level</p>
				</div>
				{courseDatas.map((courseData) => (
					<Link
						to={courseData.id}
						className="table-row-container"
						key={courseData.id}
					>
						<div className="table-row">
							<p>{courseData.CourseName}</p>
							<p>{courseData.Status}</p>
							<p>{courseData.Chapters}</p>
							<p>{courseData.totalHours}h</p>
							<p>{courseData.skill}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CourseTable;
