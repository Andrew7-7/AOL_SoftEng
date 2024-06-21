import React, { useEffect, useState } from "react";
import "./payment_page.css";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import { Link, useParams } from "react-router-dom";
import { ICourse } from "../../../global/model/course-interface";

import axios from "axios";
import { ITutor } from "../../../global/model/tutor-interface";
import { CourseCard } from "../components/courseCard";
import { TutorCard } from "../components/tutorCard";
import Modal from "../components/confirmModal";
// import PaymentForm from '../components/choosePayment';
// import useFetch from '../../../global/hooks/useFetch';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const { courseId, tutorId } = useParams();
  const [tutor, setTutor] = useState<ITutor | null>(null);
  const [course, setCourse] = useState<ICourse | null>(null);
  const ppn = tutor?.price ? parseInt(tutor.price) * 0.11 : 0;
  const totalPrice = tutor?.price ? parseInt(tutor.price) + ppn : 0;

  const handlePaymentChange = (event: any) => {
    setSelectedPayment(event.target.value);
  };

  const handlePaymentSubmit = () => {
    setLoading(true);
    // Simulating payment submission delay with setTimeout
    setTimeout(() => {
      setLoading(false);
      alert(`Selected payment method: ${selectedPayment}`);

    }, 2000);
  };

  function formatNumberWithDotSeparator(number: any) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:3002/tutor/getTutor/${tutorId}`
        ); // Replace with your API endpoint 1
        setTutor(response1.data); // Update state with data from API 1
      } catch (error) {
        console.error("Error fetching data from API 1:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response2 = await axios.get(
          `http://localhost:3002/course/getCourse/${courseId}`
        ); // Replace with your API endpoint 2
        setCourse(response2.data); // Update state with data from API 2
      } catch (error) {
        console.error("Error fetching data from API 2:", error);
      }
    };
    fetchData1();
    fetchData2();
  }, []);

  return (
    <>
      <StudentNav />
      {/* <div className="paymentpage-banner"></div> */}
      {course && tutor && (
        <div className="paymentpage-container-title-new">
          <Link to={`/${courseId}/pickTutor/${tutorId}`}>
            <div className="return-button">return</div>
          </Link>
          <div className="paymentpage-container-title-new-fortitle">
            <h1 className="h1-container-paymentpage-new">Selected Tutor</h1>
            <h1 className="h1-container-paymentpage-new">Selected Course</h1>
          </div>
          <div className="paymentpage-container-title-new-fortitle">
            <div className="coursecard-container-paymentpage">
              <TutorCard
                rating={tutor.rating == null ? 0 : tutor?.rating.toFixed(1)}
                price={tutor?.price}
                reviewLength={tutor?.reviews.length}
                name={tutor?.name}
                img={tutor?.profilePictureURL}
              ></TutorCard>
            </div>

            <div className="coursecard-container-paymentpage">
              <CourseCard
                session={course?.Sessions}
                chapter={course?.Chapters}
                title={course?.CourseName}
                img={course?.CourseImage}
              ></CourseCard>
            </div>
          </div>
          <div className="transaction-detail-container-payment-page">
            <div>
              <div className="transaction-detail-payment-page-container-1-course">
                <span>SELECTED COURSE DETAILS</span>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>Course Name</div>
                  <div>{course.CourseName}</div>
                </div>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>Total Chapters</div>
                  <div>{course.Chapters} Chapters</div>
                </div>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>Total Sessions</div>
                  <div>{course.Sessions} Sessions</div>
                </div>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>Total Hours</div>
                  <div>{course.totalHours} Hours</div>
                </div>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>Skill Level</div>
                  <div>{course.skill} Level</div>
                </div>
              </div>
              <div className="transaction-detail-payment-page-container-1">
                <span>SELECTED TUTOR DETAIL</span>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>Tutor Name</div>
                  <div>{tutor.name}</div>
                </div>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>Tutor Price</div>
                  <div>
                    Rp.
                    {tutor?.price && formatNumberWithDotSeparator(tutor.price)}
                  </div>
                </div>
              </div>
              <div className="transaction-detail-payment-page-container-1">
                <span>PRICING DETAILS</span>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>Sub Total</div>
                  <div>
                    Rp.
                    {tutor?.price && formatNumberWithDotSeparator(tutor.price)}
                  </div>
                </div>
                <div className="transaction-detail-payment-page-container-1-column-container">
                  <div>PPN (11%)</div>
                  <div>Rp.{ppn && formatNumberWithDotSeparator(ppn)}</div>
                </div>
                <div className="transaction-detail-payment-page-container-1-column-container-totalPrice">
                  <div className="transaction-detail-totalPrice-title">
                    Total Price
                  </div>
                  <div className="transaction-detail-totalPrice-details">
                    Rp.{totalPrice && formatNumberWithDotSeparator(totalPrice)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="payment-page-submit-payment-form">
            <div>
              <div className="payment-page-submit-payment-form-h1">
                Choose Your Payment Method
              </div>
              <form onSubmit={handlePaymentSubmit}>
                <div className="payment-method-radio-container-payment-page">
                  <div className="payment-method-radio-container-payment-page-row">
                    <input
                      type="radio"
                      id="bankTransfer"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={selectedPayment === "bankTransfer"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="bankTransfer">
                      Bank Transfer (with Virtual Account)
                    </label>
                  </div>
                  <div className="payment-method-radio-container-payment-page-row">
                    <input
                      type="radio"
                      id="ovo"
                      name="paymentMethod"
                      value="ovo"
                      checked={selectedPayment === "ovo"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="ovo">OVO</label>
                  </div>
                  <div className="payment-method-radio-container-payment-page-row">
                    <input
                      type="radio"
                      id="gopay"
                      name="paymentMethod"
                      value="gopay"
                      checked={selectedPayment === "gopay"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="gopay">Gopay</label>
                  </div>
                  <div className="payment-method-radio-container-payment-page-row">
                    <input
                      type="radio"
                      id="shopeepay"
                      name="paymentMethod"
                      value="shopeepay"
                      checked={selectedPayment === "shopeepay"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="shopeepay">Shopee Pay</label>
                  </div>
                  <div className="payment-method-radio-container-payment-page-row">
                    <input
                      type="radio"
                      id="creditCard"
                      name="paymentMethod"
                      value="creditCard"
                      checked={selectedPayment === "creditCard"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="creditCard">Credit Card</label>
                  </div>
                </div>
              </form>
              {selectedPayment && (
                <Modal
                  courseData={course}
                  tutorData={tutor}
                  payment={selectedPayment}
                  totalPrice={totalPrice}
                />
              )}
              {/* {loading && <div className="modal">Processing Payment...</div>} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
