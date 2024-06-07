import React from "react";
import "./permission_table.css";
import { Link } from "react-router-dom";
import { IReqCourse } from "../../../../global/model/requestCourse-interface";

const PermissionTable: React.FC<{ reqCourses: IReqCourse[] }> = ({
	reqCourses
}) => {

	return (
		<div className="permission-table-container">
			<div className="permission-table-content">
				<div className="permission-table-header">
					<p>ID</p>
					<p>Tutor Name</p>
					<p>Requested Class</p>
					<p>Status</p>
					<p>Action</p>
				</div>
				<div className="permission-table-row-outer-container">
					{reqCourses
						.sort((a, b) => parseInt(b.permissionID) - parseInt(a.permissionID)) // Sort the array based on the id
						.map((reqCourse) => (
							<div className="permission-table-row" key={reqCourse.id}>
								<p>{reqCourse.permissionID}</p>
								<p>{reqCourse.tutorName}</p>
								<p>{reqCourse.requestedClass}</p>
								<p>{reqCourse.status ? reqCourse.status : 'Waiting to be checked'}</p>
								<Link className="permission-table-details-button" to={`/permissionManagement/${reqCourse.id}`}>
									Details
								</Link>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default PermissionTable;
