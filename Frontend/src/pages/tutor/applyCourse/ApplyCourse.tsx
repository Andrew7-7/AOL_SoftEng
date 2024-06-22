import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../../global/hooks/useFetch";
import SuccessMessage from "../../../global/components/successMessage/SuccessMessage";
import closeIcon from "../../../global/assets/closeIcon.png";
import TutorNav from "../../../global/components/navbar/tutor/tutorNav";
import "./applyCourse.css";
import CourseList from "./CourseList";

const ApplyModal = ({
  showModal,
  setShowModal,
  handleApplyCourse,
  handleFileChange,
}: {
  showModal: any;
  setShowModal: any;
  handleApplyCourse: any;
  handleFileChange: any;
}) => {
  if (!showModal) {
    return <></>;
  }

  return (
    <div className="apply-modal">
      <div className="overlay"></div>
      <div className="modal-container">
        <div className="close-icon" onClick={() => setShowModal(false)}>
          <img src={closeIcon} alt="Close" />
        </div>
        <div className="top-section">
          <div className="title">Apply for a Course</div>
        </div>
        <div className="content-section">
          <input type="file" onChange={handleFileChange} />
          <div className="button-container">
            <div className="button-orange" onClick={() => handleApplyCourse()}>
              Apply Course
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplyCourseManage = () => {
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const {
    data: courseDatas,
    loading: courseLoading,
    refetch,
  } = useFetch(`http://localhost:3002/course/getApplyCourses/${user.email}`);

  const [searchItem, setSearchItem] = useState([]);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [currCourseId, setCurrCourseId] = useState("");

  const [currCourseName, setCurrCourseName] = useState("");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [success, setSuccess] = useState({
    message: "",
    show: false,
  });

  useEffect(() => {
    if (courseDatas) {
      setSearchItem(courseDatas);
    }
  }, [courseDatas]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    if (search === "") {
      setSearchItem(courseDatas);
    } else {
      setSearchItem(
        courseDatas.filter((courseData: any) =>
          courseData.CourseName.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const openModal = (courseId: string, courseName: string) => {
    setShowModal(true);
    setCurrCourseId(courseId);
    setCurrCourseName(courseName);
  };

  const handleApplyCourse = async () => {
    try {
      setSubmitLoading(true);
      await axios.post(
        "http://localhost:3002/course/applyCourse",
        {
          email: user.email,
          requestedClassID: currCourseId,
          imageURL: selectedFile,
          tutorName: user.username,
          requestedClass: currCourseName,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleSuccess("Course successfully applied");

      setShowModal(false);
    } catch (error) {
    } finally {
      setSubmitLoading(false);
      refetch();
    }
  };

  const handleSuccess = (message: string) => {
    setSuccess({
      message: message,
      show: true,
    });
    setTimeout(() => {
      setSuccess({
        message: message,
        show: false,
      });
    }, 5000);
  };

  console.log(courseDatas);

  return (
    <div className="apply-course-page">
      <SuccessMessage message={success.message} show={success.show} />
      <ApplyModal
        handleFileChange={handleFileChange}
        setShowModal={setShowModal}
        showModal={showModal}
        handleApplyCourse={handleApplyCourse}
      />
      <TutorNav clickedItem="Course Lists" />
      <div className="content-section">
        <div className="page-center">
          <div className="content-container">
            <div className="header-section">
              <div className="header">Course List</div>
            </div>
            <div className="table-section">
              {!courseLoading && (
                <CourseList handleDelete={openModal} courseDatas={searchItem} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyCourseManage;
