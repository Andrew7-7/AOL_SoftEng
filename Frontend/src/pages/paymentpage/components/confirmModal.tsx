import React, { MouseEventHandler, useState, useEffect } from 'react';
import axios from "axios";
import './confirmModal.css';
import { ICourse } from '../../../global/model/course-interface';
import { useNavigate } from 'react-router-dom';
import { ITutor } from '../../../global/model/tutor-interface';
import { IUser } from '../../../global/model/user-interface';
import { ITransaction } from '../../../global/model/transaction-interface';
import useFetch from '../../../global/hooks/useFetch';

const Modal: React.FC<{ courseData: ICourse; tutorData: ITutor; payment: string; totalPrice: number }> = ({ courseData, tutorData, payment, totalPrice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [price, setPrice] = useState("")
  const [tutorEmail, setTutorEmail] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    setCourseId(courseData.CourseID)
    setPaymentMethod(payment)
    setPrice(totalPrice.toString())
    setTutorEmail(tutorData.id)
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Call your function with the required arguments
    handleRegister(courseId, paymentMethod, price, tutorEmail, userEmail);
  };


  const { data: transactionDatas } = useFetch(
    "http://localhost:3002/transaction/getTransaction/"
  );

  const handleRegister = (
    courseId: string,
    paymentMethod: string,
    price: string,
    tutorEmail: string,
    userEmail: string,
  ) => {
    const fetchRegister = async () => {
      const extraAuth =
        "aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k";

      try {
        const res = await axios.post(
          "http://localhost:3002/transaction/registerTransaction",
          { courseId, paymentMethod, price, tutorEmail, userEmail },
          {
            headers: {
              auth: `Bearer ${extraAuth}`,
            },
          }
        );

        if (res.status === 200) {
          console.log(res.data.message)
        }
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
        } else {
          console.log(err);
        }
      }
    };

    fetchRegister();
  };

  return (
    <div>
      <button className="chapterbreakdown-set-coursedetail-3-paymentpage" onClick={toggleModal}>See All Chapter Breakdowns</button>
      {isOpen && (
        <div className="modal-paymentpage">
          <div className="modal-content-paymentpage">
            <button className="close-paymentpage-paymentpage" onClick={toggleModal}>&times;</button>
            <h2>tutor name {tutorData.name} - {courseData.CourseName}</h2>
            <div className=".chapterbreakdown-container-coursedetail-paymentpage">
              <button
                onClick={toggleModal}
              >no</button>
              <button onClick={handleClick}>Click me</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
