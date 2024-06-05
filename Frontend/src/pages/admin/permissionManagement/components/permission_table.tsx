import React from "react";
import "./permission_table.css";
import { Link } from "react-router-dom";
import { IReqCourse } from "../../../../global/model/requestCourse-interface";

const PermissionTable: React.FC<{ reqCourses: IReqCourse[] }> = ({
	reqCourses
}) => {

	return (
		<div className="course-table-container-permission-table">
			<div className="table-content-permission-table">
				<div className="table-header-permission-table">
					<p>ID</p>
					<p>Tutor Name</p>
					<p>Requested Class</p>
					<p>Status</p>
					<p>Action</p>
				</div>
				<div className="table-row-outer-container-permission-table">
					{reqCourses
						.sort((a, b) => parseInt(b.permissionID) - parseInt(a.permissionID)) // Sort the array based on the id
						.map((reqCourse) => (
							<div className="table-row-permission-table" key={reqCourse.id}>
								<p>{reqCourse.permissionID}</p>
								<p>{reqCourse.tutorName}</p>
								<p>{reqCourse.requestedClass}</p>
								<p>{reqCourse.status ? 'reqCourse.status' : 'Waiting to be checked'}</p>
								<Link className="delete-button-permission-table" to={`/permissionManagement/${reqCourse.id}`}>
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
