import TutorNav from "../../../../global/components/navbar/tutor/tutorNav";
import "./activeClassDetail_css.css";
import "../../activeClass/view/activeClass_css.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import peopleImage from "../../../../global/assets/ic_baseline-people.png";
import pencilEdit from "../../../../global/assets/pencilEdit.png";
import axios from "axios";
const ActiveClassDetail = () => {
  const { id } = useParams();
  const accToken = window.localStorage.getItem("accToken");
  const [classDetail, setClassDetail] = useState<any>({});
  const [session, setSession] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getActiveClassDetail = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/tutor/getActiveClassDetail",
          { id },
          {
            headers: {
              auth: `Bearer ${accToken}`,
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data.sessions);
          setClassDetail(res.data.class);
          setSession(res.data.sessions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getActiveClassDetail();
  }, []);

  const ActiveCLassCard = () => {
    const { course } = classDetail;

    return (
      <div className="ActiveClassCard" style={{ cursor: "default" }}>
        <div className="ActiveClassCardUpper">
          {course && (
            <p className="ActiveClassCardTitle">{course.courseName}</p>
          )}
          <p className="ActiveClassCardSubtitle">Class {classDetail.classId}</p>
          <p className="ActiveClassCardSubtitle">
            <img className="peopleImage" src={peopleImage} />
            {classDetail.student ? classDetail.student.length : 0}
          </p>
        </div>
        <div className="ActiveClassCardBottom">
          {course && (
            <span>
              {session.filter((session: any) => session.done).length} /{" "}
              {course.totalSession} session(s) completed
            </span>
          )}
        </div>
      </div>
    );
  };

  const SessionCard = () => {
    const formatDate = (timestamp: string) => {
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      };
      return new Date(parseInt(timestamp, 10)).toLocaleDateString(
        undefined,
        options
      );
    };

    const formatTime = (timestamp: string) => {
      const date = new Date(parseInt(timestamp, 10));
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };
    return (
      <>
        <div className="sessionCard">
          <div className="leftSessionCard">
            <div>
              <p className="sessionNumber">Session 1</p>
              <p className="sessionDate">{formatDate("1716258600594")},</p>
              <p className="sessionDate">
                {formatTime("1716251400374")} - {formatTime("1716258600594")}
              </p>
            </div>
            <img
              className="pencilEditImage"
              src={pencilEdit}
              onClick={() => {}}
            />
          </div>
          <div className="rightSessionCard">
            <div className="sessionOutline">
              <p className="outlineCategory">Outline</p>
              UseState & UseEffect
            </div>
            <div className="attendanceDiv">
              <p className="zoomLink">
                Zoom Link :{" "}
                <p>
                  <a
                    href="https://support.zoom.com/hc/id/article?id=zm_kb&sysparm_article=KB0063309"
                    style={{ color: "darkOrange", cursor: "pointer" }}
                    target="_blank"
                    className="zoomLink"
                  >
                    https://support.zoom.com/hc/id/article?id=zm_kb&sysparm_article=KB0063309
                  </a>
                </p>
              </p>
              <button className="attendanceButton" onClick={() => {}}>
                Attendance
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="outerDiv">
      <TutorNav clickedItem="Active Class" />
      <div className="detailRightDiv">
        <div>
          <ActiveCLassCard />
          <div
            className="backButton"
            onClick={() => {
              navigate("/activeClass");
            }}
          >
            Back
          </div>
        </div>
        <div>
          <div className="upcomingSessionOuter">
            <p className="detailSubtitle">Upcoming Session</p>
            <div className="upcomingSessionDiv">
              <SessionCard />
              <SessionCard />
              <SessionCard />
            </div>
          </div>
          <div className="upcomingSessionOuter">
            <p className="detailSubtitle">Finished Session</p>
            <div className="upcomingSessionDiv">
              <SessionCard />
              <SessionCard />
              <SessionCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveClassDetail;
