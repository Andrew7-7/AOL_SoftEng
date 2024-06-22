import React from "react";
import "./appliedCourseTable.css";
import { Link } from "react-router-dom";

const AppliedCourseTable: React.FC<{ reqCourses: any[] }> = ({
  reqCourses,
}) => {
  return (
    <div className="applied-table-container">
      <div className="applied-table-content">
        <div className="applied-table-header">
          <p>ID</p>
          <p>Tutor Name</p>
          <p>Requested Class</p>
          <p>Status</p>
        </div>
        <div className="applied-table-row-outer-container">
          {reqCourses
            .sort((a, b) => parseInt(b.permissionID) - parseInt(a.permissionID)) // Sort the array based on the id
            .map((reqCourse, index) => (
              <div className="applied-table-row" key={reqCourse.id}>
                <p>{index + 1}</p>
                <p>{reqCourse.tutorName}</p>
                <p>{reqCourse.requestedClass}</p>
                <p>
                  {reqCourse.status
                    ? reqCourse.status
                    : "Waiting to be checked"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedCourseTable;
