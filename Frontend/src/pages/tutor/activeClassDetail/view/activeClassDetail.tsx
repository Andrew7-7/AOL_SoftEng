import TutorNav from "../../../../global/components/navbar/tutor/tutorNav";
import "./activeClassDetail_css.css";
import "../../activeClass/view/activeClass_css.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import peopleImage from "../../../../global/assets/ic_baseline-people.png";
import pencilEdit from "../../../../global/assets/pencilEdit.png";
import axios from "axios";
import { IClassSession } from "../../../../global/model/classSession-interface";
const ActiveClassDetail = () => {
  const { id } = useParams();
  const accToken = window.localStorage.getItem("accToken");
  const [classDetail, setClassDetail] = useState<any>({});
  const [editStatus, setEditStatus] = useState(true);
  const [session, setSession] = useState<IClassSession[]>([]);
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
          setClassDetail(res.data.class);
          setSession(res.data.sessions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getActiveClassDetail();
  }, [editStatus]);

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

  const SessionCard = ({
    sessionID,
    startDate,
    endDate,
    sessionNumber,
    outline,
    zoomLink,
  }: {
    startDate: string;
    endDate: string;
    sessionID: string;
    sessionNumber: number;
    outline: string;
    zoomLink: string;
  }) => {
    const toISOStringWithoutTimezone = (date: Date) => {
      const tzOffset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date.getTime() - tzOffset)
        .toISOString()
        .slice(0, 16);
      return localISOTime;
    };
    const [editTime, setEditTime] = useState(false);
    const [newStartDate, setNewStartDate] = useState(
      toISOStringWithoutTimezone(new Date(startDate))
    );
    const [newEndDate, setNewEndDate] = useState(
      toISOStringWithoutTimezone(new Date(endDate))
    );

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

    const handleCancel = () => {
      setNewStartDate(new Date(startDate).toISOString().slice(0, 16));
      setNewEndDate(new Date(endDate).toISOString().slice(0, 16));
      setEditTime(false);
    };

    const handleSave = async () => {
      const updatedStartDate = new Date(newStartDate).getTime();
      const updatedEndDate = new Date(newEndDate).getTime();

      try {
        const res = await axios.post(
          "http://localhost:3002/tutor/editSessionTime",
          { classID: id, sessionID, updatedStartDate, updatedEndDate },
          {
            headers: {
              auth: `Bearer ${accToken}`,
            },
          }
        );
        if (res.status === 200) {
          setEditTime(false);
          setEditStatus(!editStatus);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        <div className="sessionCard">
          <div className="leftSessionCard">
            <div>
              <p className="sessionNumber">Session {sessionNumber}</p>
              <p className="sessionDate">{formatDate(endDate)},</p>
              <p className="sessionDate">
                {formatTime(startDate)} - {formatTime(endDate)}
              </p>
            </div>
            <img
              className="pencilEditImage"
              src={pencilEdit}
              onClick={() => {
                setEditTime(!editTime);
              }}
            />
          </div>
          <div className="rightSessionCard">
            <div className="sessionOutline">
              <p className="outlineCategory">Outline</p>
              {outline}
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
                    {zoomLink}
                  </a>
                </p>
              </p>
              <button className="attendanceButton" onClick={() => {}}>
                Attendance
              </button>
            </div>
          </div>
        </div>

        {editTime ? (
          <div className="editTimeContainer">
            <div className="timeDiv">
              <label>
                Start Date:{" "}
                <input
                  type="datetime-local"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                />
              </label>
              <label>
                End Date:{" "}
                <input
                  type="datetime-local"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                />
              </label>
            </div>
            <div className="timeButton">
              <button className="saveTimeButton" onClick={handleSave}>
                Save
              </button>
              <button className="cancelTimeButton" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : null}
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
              {session
                .filter((item) => !item.done)
                .sort((a, b) => a.session - b.session)
                .map((item) => (
                  <SessionCard
                    sessionNumber={item.session}
                    startDate={item.startDateTimestamp}
                    endDate={item.endDateTimestamp}
                    sessionID={item.id}
                    outline={item.outline}
                    zoomLink={item.zoomLink}
                  />
                ))}
            </div>
          </div>
          <div className="upcomingSessionOuter">
            <p className="detailSubtitle">Finished Session</p>
            <div className="upcomingSessionDiv">
              {session
                .filter((item) => item.done)
                .sort((a, b) => a.session - b.session)
                .map((item) => (
                  <SessionCard
                    sessionNumber={item.session}
                    startDate={item.startDateTimestamp}
                    endDate={item.endDateTimestamp}
                    sessionID={item.id}
                    outline={item.outline}
                    zoomLink={item.zoomLink}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveClassDetail;
