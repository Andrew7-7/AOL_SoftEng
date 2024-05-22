import { Link, useParams } from "react-router-dom";
import useFetch from "../../../global/hooks/useFetch";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import './course_detail_page.css'
const CourseDetailPage = () => {
  const { courseId } = useParams();

  const { data: tutorData, loading: tutorLoading } = useFetch(
    `http://localhost:3002/course/getCourse/${courseId}`
  );

  if (tutorLoading) {
    return <div></div>;
  }

interface currentCourse{
  id: string,
  Type: string,
  Color: string,
  CourseName: string,
  Status: string,
  Chapters: number,
  CourseID: number,
  Sessions: number,
  CourseImage: string,
  banner:string,
}

  console.log(tutorData);

  return (
    <>
      <StudentNav />
      <div className="banner-activecourse" style={{backgroundImage: `url("${tutorData.banner}")`, backgroundSize: "100%" }}>
        <div className="back-to-home-button">
          <img className="polygon-1" src="assets/vectors/Unknown" />
          <span className="back-to-course-page">
          Back to Course Page
          </span>
        </div>
       
      </div>
    </>
  );
};

export default CourseDetailPage;
