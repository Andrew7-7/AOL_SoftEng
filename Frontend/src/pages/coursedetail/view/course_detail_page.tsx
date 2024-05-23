import { Link, useParams } from "react-router-dom";
import useFetch from "../../../global/hooks/useFetch";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import './course_detail_page.css'
import Modal from "../components/modal";
const CourseDetailPage = () => {
  const { courseId } = useParams();

  const { data: courseData, loading: courseLoading } = useFetch(
    `http://localhost:3002/course/getCourse/${courseId}`
  );

  if (courseLoading) {
    return <div></div>;
  }

  const id = courseData.CourseID
  const displayedChapters: string[] = courseData.chapterBreakdown.slice(0, 5);

  return (
    <>
      <StudentNav />
      <div className="container-coursedetail">
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
          <div className="coursedescription-container-coursedetail">
            <h1>Course Description</h1>
            <p>{courseData.description}</p>
            <Link to={`/${id}/pickTutor`}>
              <div className="book-this-course-button-coursedetail">
                Book This Course
              </div>
            </Link>
          </div>

          <div className="chapterbreakdown-container-coursedetail">
            <p>Total Hours : {courseData.totalHours} hours</p>
            <h1>
              Chapter Breakdown
            </h1>
            <div className="chapterbreakdown-container-coursedetail-2">
              {displayedChapters.map((name, index) => (
                <div className="chapterbreakdown-set-coursedetail" key={index}>
                  Chapter {index + 1} : {name}
                </div>
              ))}
              <Modal courseData={courseData} />
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
