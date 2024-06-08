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
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [price, setPrice] = useState("")
  const [tutorName, setTutorName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [tutorId, setTutorId] = useState("")


  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user") || "{}");
		setUserEmail(user?.email);
    setCourseId(courseData.CourseID)
    setPaymentMethod(payment)
    setPrice(totalPrice.toString())
    setTutorName(tutorData.name)
    setTutorId(tutorData.id)
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    handleRegister(courseId, paymentMethod, price, tutorName, userEmail);
  };


  // const { data: transactionDatas } = useFetch(
  //   "http://localhost:3002/transaction/getTransaction/"
  // );

  const handleRegister = (
    courseId: string,
    paymentMethod: string,
    price: string,
    tutorName: string,
    userEmail: string,
  ) => {
    const fetchRegister = async () => {
      const extraAuth =
        "aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k";

      try {
        const res = await axios.post(
          "http://localhost:3002/transaction/registerTransaction",
          { courseId, paymentMethod, price, tutorName, userEmail },
          {
            headers: {
              auth: `Bearer ${extraAuth}`,
            },
          }
        );

        if (res.status === 200) {
          console.log(res.data.message)
          navigate(`/${courseId}/${tutorId}/payment/confirmed`)
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
      <button className="chapterbreakdown-set-coursedetail-3-paymentpage"
        onClick={toggleModal}>
        Complete Payment
      </button>
      {isOpen && (
        <div className="modal-paymentpage">
          <div className="modal-content-paymentpage">
            <div className='modal-content-paymentpage-title-container'>
              <h1>
                Confirm your order
              </h1>
              <h2>
                Note: you can not undo (cancel) this order anymore
              </h2>
              <h2>
                if you choose yes
              </h2>
            </div>
            <div className="chapterbreakdown-container-coursedetail-paymentpage">
              <button
                onClick={toggleModal}
              >
                NO
              </button>
              <button
                onClick={handleClick}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
