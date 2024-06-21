import { useEffect, useState } from "react";
import "./materialPage.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StudentNav from "../../global/components/navbar/student/student_navbar";
import { format } from "date-fns";
import closeIcon from "../../global/assets/closeIcon.png";
import InputForm from "../../global/components/textBox/InputForm";
import SuccessMessage from "../../global/components/successMessage/SuccessMessage";

const ReviewModal = ({
  handleChange,
  formData,
  showModal,
  setShowModal,
  handleSubmitReview,
}: {
  handleChange: any;
  formData: any;
  showModal: any;
  setShowModal: any;
  handleSubmitReview: any;
}) => {
  if (!showModal) {
    return <></>;
  }

  return (
    <div className="reivew-modal">
      <div className="overlay"></div>
      <div className="modal-container">
        <div className="close-icon" onClick={() => setShowModal(false)}>
          <img src={closeIcon} alt="" />
        </div>
        <div className="top-section">
          <div className="title">Give a Review</div>
        </div>
        <div className="content-section">
          <InputForm
            label={"Comment"}
            name="comment"
            onChange={handleChange}
            placeHolder="Type a comment"
            type="text"
            value={formData.comment}
          />
          <InputForm
            label={"Rating"}
            name="rating"
            onChange={handleChange}
            placeHolder="Give a rating (1-5)"
            type="number"
            value={formData.rating}
          />
          <div className="button-orange" onClick={() => handleSubmitReview()}>
            Submit review
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialPage = () => {
  const { id, email } = useParams();

  const user = JSON.parse(window.localStorage.getItem("user") || "{}");

  console.log(id);

  const accToken = window.localStorage.getItem("accToken");

  const [currClass, setCurrClass] = useState<any>(null);

  const [sessions, setSessions] = useState<any>(null);

  const [tutor, setTutor] = useState<any>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [success, setSuccess] = useState({
    message: "",
    show: false,
  });

  const [formValues, setFormValues] = useState({
    comment: "",
    rating: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "rating") {
      const ratingValue = Number(value);
      if (ratingValue < 1 || ratingValue > 5) {
        return;
      }
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSuccess = (message: string) => {
    console.log("MASUK");

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

  useEffect(() => {
    const getActiveClassDetail = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/tutor/getCurrActiveClassDetail",
          { courseId: id, student: email }
        );
        if (res.status === 200) {
          console.log(res.data);
          setCurrClass(res.data.class);
          setSessions(res.data.sessions);
          setTutor(res.data.tutor);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getActiveClassDetail();
  }, []);

  if (currClass == null || sessions == null) {
    return <div></div>;
  }

  const handleSubmitReview = async () => {
    console.log("tes");
    try {
      const res = await axios.post("http://localhost:3002/tutor/createReview", {
        comment: formValues.comment,
        rating: formValues.rating,
        studentEmail: user.email,
        tutorId: tutor,
      });

      if (res.status === 200) {
        console.log("Review submitted successfully");
        setShowModal(false);
        handleSuccess("Review submitted successfully");
      }
    } catch (error) {
      console.log("ERROR");
    }
  };

  const ScheduleCard = ({ session }: { session: any }) => {
    const formatDate = (timestamp: any) => {
      const date = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );

      const formattedDate = format(date, "MMMM do, yyyy");

      return formattedDate;
    };

    const formatTime = (timestamp: any) => {
      const date = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );

      const formattedDate = format(date, "h:mm a");

      return formattedDate;
    };

    return (
      <div key={session.id} className="session">
        <div className="schedule-card">
          <div className="left">
            <div className="date">{formatDate(session.startDate)}</div>
            <div className="time">{`${formatTime(
              session.startDate
            )} - ${formatTime(session.endDate)}`}</div>
          </div>
          <div className="right">{session.outline}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ReviewModal
        formData={formValues}
        handleChange={handleChange}
        setShowModal={setShowModal}
        showModal={showModal}
        handleSubmitReview={handleSubmitReview}
      />
      <SuccessMessage message={success.message} show={success.show} />
      <StudentNav />
      <div className="material-page">
        <div className="banner-section">
          <div className="page-center">
            <div className="title">{currClass.course.courseName}</div>
          </div>
        </div>
        <div className="page-center">
          <div className="header">Schedule</div>
        </div>
        <div className="content-section">
          <div className="page-center">
            <div className="outer-content">
              <div className="schedule-section">
                <div className="inner-content">
                  {sessions.map((session: any) => (
                    <ScheduleCard session={session} />
                  ))}
                </div>
              </div>
              <div className="button-section">
                <Link to={`/chat/${tutor}`}>
                  <div className="button-container">
                    <div className="button-orange">Chat your tutor</div>
                  </div>
                </Link>
                <div
                  className="button-container"
                  onClick={() => setShowModal(true)}
                >
                  <div className="button-orange">Review your tutor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialPage;
