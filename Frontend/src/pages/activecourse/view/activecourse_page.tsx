import React, { useMemo, useState } from 'react'
import StudentNav from '../../../global/components/navbar/student/student_navbar'
import useFetch from '../../../global/hooks/useFetch';
import { Card } from './components/coursecard';
import { ICourse } from '../../../global/model/course-interface';
import { useParams } from 'react-router-dom';
import './activecourse_page.css'
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>

const activecourse_page = () => {
	const { courseId } = useParams();

	const { data: tutorDatas, loading: tutorLoading } = useFetch(
		"http://localhost:3002/course/getCourses"
	);

	console.log(tutorDatas);

	if (tutorLoading) {
		return <div></div>;
	}

	return (
		<>
			<StudentNav />
			<div className="pick-tutor-page">
				<div className="page-center">
					<div className="pick-tutor-page-content">
						<div className="back-section"></div>
						<div className="tutor-list-section">
							<div className="header">Tutor List</div>
							<div className="tutor-list-container">
								{tutorDatas.map((tutorData: ICourse) => (
									<Card
                  title = {tutorData.CourseName}
                  session = {tutorData.Sessions}
                  chapter = {tutorData. Chapters}
                  img = {tutorData.CourseImage}
                />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default activecourse_page;