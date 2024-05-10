import { useParams } from "react-router-dom";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import "./pick_tutor_page.css";
import useFetch from "../../../global/hooks/useFetch";
import { ITutor } from "../../../global/model/tutor-interface";
import TutorCard from "../components/tutor_card";

const PickTutorPage = () => {
  const { courseId } = useParams();

  const { data: tutorDatas, loading: tutorLoading } = useFetch(
    "http://localhost:3002/tutor/getTutors"
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
                {tutorDatas.map((tutorData: ITutor) => (
                  <TutorCard tutorData={tutorData} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PickTutorPage;
