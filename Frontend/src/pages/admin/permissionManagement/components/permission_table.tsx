import React from "react";
import "./permission_table.css";
import { Link } from "react-router-dom";
import { IReqCourse } from "../../../../global/model/requestCourse-interface";

const PermissionTable: React.FC<{ reqCourses: IReqCourse[] }> = ({
	reqCourses
}) => {
	
	return (
		<div className="course-table-container">
			<div className="table-content">
				<div className="table-header">
					<p>ID</p>
					<p>Tutor Name</p>
					<p>Requested Class</p>
					<p>Action</p>
					<p></p>
				</div>
				<div className="table-row-outer-container">
					{reqCourses
						.sort((a, b) => parseInt(b.permissionID) - parseInt(a.permissionID)) // Sort the array based on the id
						.map((reqCourse) => (
							<div className="table-row" key={reqCourse.id}>
								<p>{reqCourse.permissionID}</p>
								<p>{reqCourse.tutorName}</p>
								<p>{reqCourse.requestedClass}</p>
								<Link to={`/permissionManagement/${reqCourse.id}`}>
									details
								</Link>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default PermissionTable;
