import { Link, useParams } from "react-router-dom";
import useFetch from "../../../global/hooks/useFetch";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import './course_detail_page.css'
const CourseDetailPage = () => {
  const { courseId } = useParams();

  const { data: courseData, loading: courseLoading } = useFetch(
    `http://localhost:3002/course/getCourse/${courseId}`
  );

  if (courseLoading) {
    return <div></div>;
  }

  return (
    <>
      <StudentNav />
      <div className="banner-coursedetail" style={{ backgroundImage: `url("${courseData.banner}")`, backgroundSize: "100%" }}>
        <Link to={`/activecourse`}>
          <div className="back-t0-home-page-coursedetail">
            <div className="back-t0-home-page-coursedetail">
              <div className="back-to-home-button-1-coursedetail">
                <div className="btn-coursedetail"></div>
              </div>
              <span className="back-to-home-page-title-coursedetail">
                Back to Course Page
              </span>
            </div>
          </div>
        </Link>
        <div className="course-detail-descrption-coursedetail">
          <div className="container-coursedetail">
            <div className="container-2-coursedetail">
              <div className="title-description-coursedetail">
                Course Detail
              </div>
              <div className="line-1-coursedetail"></div>
              <div className="total-sessions-coursedetail">
                {courseData.Sessions} Total Sessions
              </div>
              <div className="line-coursedetail">
              </div>
              <div className="total-chapters-coursedetail">
                {courseData.Chapters} Total Chapters
              </div>
              <div className="line-coursedetail">
              </div>
              <span className="skill-level-coursedetail">
                Skill Level: {courseData.skill}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
