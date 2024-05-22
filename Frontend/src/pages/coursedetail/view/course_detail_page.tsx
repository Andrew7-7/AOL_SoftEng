import { Link, useParams } from "react-router-dom";
import useFetch from "../../../global/hooks/useFetch";
import StudentNav from "../../../global/components/navbar/student/student_navbar";

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
}

  console.log(tutorData);

  return (
    <>
      <StudentNav />
      <h1>{courseId}</h1>
    {tutorData.CourseID}
    {tutorData.Chapters}
    <Link to={'/contohdetailpage'}>contoh </Link>
    </>
  );
};

export default CourseDetailPage;
