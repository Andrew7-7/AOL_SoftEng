import { useState } from "react";
import "./attendance_modal.css";
import useFetch from "../../../../global/hooks/useFetch";
import closeIcon from "../../../../global/assets/closeIcon.png";
import axios from "axios";

interface attendanceModalProps {
  show: boolean;
  student: string[];
  closeModal: any;
  classId: any;
  sessionId: string;
  handleSuccess: any;
  setEditStatus: any;
  editStatus: boolean;
}

interface studentRowProps {
  studentEmail: string;
  index: number;
  checkState: boolean[];
  handleChange: any;
}

const StudentRow: React.FC<studentRowProps> = ({
  studentEmail,
  index,
  checkState,
  handleChange,
}) => {
  const { data: userData, loading: userLoading } = useFetch(
    `http://localhost:3002/user/getUserByEmail/${studentEmail}`
  );

  if (userLoading) {
    return <div></div>;
  }

  return (
    <div className="student-row">
      <div className="left-side">
        <div className="left">
          <img src={userData.studentData.profileURL} alt="" />
        </div>
        <div className="right">
          <div className="username">{userData.username}</div>
          <div className="email">{userData.email}</div>
        </div>
      </div>
      <div className="right-side">
        <input
          type="checkbox"
          checked={checkState[index]}
          onClick={() => handleChange(index)}
        />
      </div>
    </div>
  );
};

const AttendanceModal: React.FC<attendanceModalProps> = ({
  show,
  student,
  closeModal,
  classId,
  sessionId,
  handleSuccess,
  editStatus,
  setEditStatus,
}) => {
  const accToken = window.localStorage.getItem("accToken");

  if (!show) {
    return null;
  }

  const [checkState, setCheckState] = useState<boolean[]>(
    new Array(student.length).fill(false)
  );

  let attend = [""];
  let absent = [""];

  const handleCheckboxChange = (position: number) => {
    const updatedCheckedState = checkState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckState(updatedCheckedState);
  };

  const handleSubmitAttendance = async (sessionId: string) => {
    attend = [];
    absent = [];

    let index = 0;
    checkState.forEach((item) => {
      if (item) {
        attend.push(student[index]);
      } else {
        absent.push(student[index]);
      }
      index += 1;
    });

    try {
      const res = await axios.put(
        "http://localhost:3002/tutor/submitAttendance",
        { classId, sessionId, attend, absent },
        {
          headers: {
            auth: `Bearer ${accToken}`,
          },
        }
      );

      handleSuccess(res.data.message);

      setEditStatus(!editStatus);
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  console.log(sessionId);

  return (
    <div className="attendance-modal">
      <div className="overlay"></div>
      <div className="modal-container">
        <div className="close-icon" onClick={closeModal}>
          <img src={closeIcon} alt="" />
        </div>
        <div className="top-section">
          <div className="title">Attendance List</div>
        </div>
        <div className="table-header">
          <p>Student</p>
          <p>Attendance</p>
        </div>
        <div className="student-list-container">
          {student.map((s, index) => (
            <StudentRow
              key={index}
              studentEmail={s}
              index={index}
              checkState={checkState}
              handleChange={handleCheckboxChange}
            />
          ))}
        </div>
        <div className="bottom-section">
          <div
            className="submit-button"
            onClick={() => handleSubmitAttendance(sessionId)}
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
