import { useState } from "react";
import "./attendance_modal.css";
import useFetch from "../../../../global/hooks/useFetch";

interface attendanceModalProps {
	show: boolean;
	student: string[];
}

interface studentRowProps {
	studentEmail: string;
}

const StudentRow: React.FC<studentRowProps> = ({ studentEmail }) => {
	const { data: userData, loading: userLoading } = useFetch(
		`http://localhost:3002/user/getUserByEmail/${studentEmail}`
	);

	if (userLoading) {
		return <div></div>;
	}

	console.log(userData);

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
				<input type="checkbox" />
			</div>
		</div>
	);
};

const AttendanceModal: React.FC<attendanceModalProps> = ({ show, student }) => {
	if (!show) {
		return null;
	}

	const [checkState, setCheckState] = useState(
		new Array(student.length).fill(false)
	);

	const [attendance, setAttendance] = useState({
		present: [""],
		absent: [""],
	});

	return (
		<div className="attendance-modal">
			<div className="overlay"></div>
			<div className="modal-container">
				<div className="top-section">
					<div className="title">Attendance List</div>
				</div>
				<div className="table-header">
					<p>Student</p>
					<p>Attendance</p>
				</div>
				<div className="student-list-container">
					{student.map((s) => (
						<StudentRow studentEmail={s} />
					))}
				</div>
			</div>
		</div>
	);
};

export default AttendanceModal;
