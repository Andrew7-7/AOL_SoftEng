import React, { useMemo, useState } from 'react'
import StudentNav from '../../../global/components/navbar/student/student_navbar'
import useFetch from '../../../global/hooks/useFetch';
import { Card } from './components/coursecard';
import { ICourse } from '../../../global/model/course-interface';
import { Link, useParams } from 'react-router-dom';
import './activecourse_page.css'

const activecourse_page = () => {
	const { id } = useParams();

	const { data: courseDatas, loading: courseLoading } = useFetch(
		"http://localhost:3002/course/getCourses"
	);

	console.log(courseDatas);

	if (courseLoading) {
		return <div></div>;
	}

	return (
		<>
			<StudentNav />
			<div className="banner">
				<div className="banner-title">
					Welcome to our comprehensive course
				</div>
				<span className="banner-subtitle">
					We offer a wide range of courses designed to help you master the art of coding. Whether you&#39;re a beginner or an experienced programmer, we have something for everyone.
				</span>
				<div className="banner-image"></div>
			</div>
			<Link to={`/home`}>
			<div className="back-t0-home-page">
				<div className="back-to-home-button-1">
					<div className="btn"></div>
				</div>
				<span className="back-to-home-page-title">
					Back to Home Page
				</span>
			</div>
			</Link>
			<div className="all-course">
				All Course
			</div>
			<div className="course-list-container">
				{courseDatas.map((CourseData: ICourse) => (
					<Card
						title={CourseData.CourseName}
						session={CourseData.Sessions}
						chapter={CourseData.Chapters}
						img={CourseData.CourseImage}
						courseId={CourseData.CourseID}
						id={CourseData.id}
					/>
				))}
			</div>
		</>
	);
};

export default activecourse_page;