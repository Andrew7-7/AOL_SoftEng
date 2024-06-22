import React from "react";
import { Link } from "react-router-dom";
import { ICourse } from "../../../global/model/course-interface";
import "./courseList.css";

const CourseList: React.FC<{ courseDatas: ICourse[]; handleDelete: any }> = ({
  courseDatas,
  handleDelete,
}) => {
  return (
    <div className="course-list-container">
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
              <p>{courseData.hourPerSession}h</p>
              <p>{courseData.skill}</p>
              <div
                onClick={() =>
                  handleDelete(courseData.id, courseData.CourseName)
                }
                className="apply-button"
              >
                Apply
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
