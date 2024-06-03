import React from "react";
import "./course_table.css";
import { ICourse } from "../../../../global/model/course-interface";
import { Link } from "react-router-dom";

const CourseTable: React.FC<{ courseDatas: ICourse[]; handleDelete: any }> = ({
	courseDatas,
	handleDelete,
}) => {
	return (
		<div className="course-table-container">
			<div className="table-content">
				<div className="table-header">
					<p>Name</p>
					<p>Status</p>
					<p>Chapters</p>
					<p>Duration</p>
					<p>Level</p>
				</div>
				<div className="table-row-outer-container">
					{courseDatas.map((courseData) => (
						<div className="table-row" key={courseData.id}>
							<p>{courseData.CourseName}</p>
							<p>{courseData.Status}</p>
							<p>{courseData.Chapters}</p>
							<p>{courseData.totalHours}h</p>
							<p>{courseData.skill}</p>
							<Link
								to={courseData.id}
								className="edit-button"
								key={courseData.id}
							>
								Edit
							</Link>
							<div
								onClick={() => handleDelete(courseData.id)}
								className="delete-button"
							>
								Delete
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CourseTable;
