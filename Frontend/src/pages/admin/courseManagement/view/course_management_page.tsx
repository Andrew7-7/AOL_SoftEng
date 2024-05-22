import { ChangeEvent, useEffect, useState } from "react";
import AdminNav from "../../../../global/components/navbar/admin/adminNav";
import useFetch from "../../../../global/hooks/useFetch";
import CourseTable from "../components/course_table";
import "./course_management_page.css";
import { ICourse } from "../../../../global/model/course-interface";
import { Link } from "react-router-dom";

const CourseManagementPage = () => {
	const { data: courseDatas, loading: courseLoading } = useFetch(
		"http://localhost:3002/course/getCourses"
	);

	const [searchItem, setSearchItem] = useState<ICourse[]>([]);

	useEffect(() => {
		if (courseDatas) {
			setSearchItem(courseDatas);
		}
	}, [courseDatas]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const search = event.target.value;
		if (search === "") {
			console.log(courseDatas);
			setSearchItem(courseDatas);
		} else {
			setSearchItem(
				courseDatas.filter((courseData: ICourse) =>
					courseData.CourseName.toLowerCase().includes(search.toLowerCase())
				)
			);
		}
	};

	return (
		<div className="course-management-page">
			<AdminNav clickedItem="Course" />
			<div className="content-section">
				<div className="page-center">
					<div className="content-container">
						<div className="header-section">
							<div className="header">Course Management</div>
						</div>
						<div className="top-section">
							<input
								className="searchBar"
								placeholder="Search"
								type="search"
								onChange={handleInputChange}
							></input>
							<Link to={`/createCourse`} className="button-container">
								<div className="button-orange">Add new</div>
							</Link>
						</div>
						<div className="table-section">
							{!courseLoading && <CourseTable courseDatas={searchItem} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseManagementPage;
