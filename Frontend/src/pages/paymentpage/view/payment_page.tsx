import React, { useEffect, useState } from 'react';
import './payment_page.css';
import StudentNav from '../../../global/components/navbar/student/student_navbar';
import { Link, useParams } from 'react-router-dom';
import { ICourse } from '../../../global/model/course-interface';

import axios from 'axios';
import { ITutor } from '../../../global/model/tutor-interface';
import { CourseCard } from '../components/courseCard';
import { TutorCard } from '../components/tutorCard';
import Modal from '../components/confirmModal';
// import PaymentForm from '../components/choosePayment';
// import useFetch from '../../../global/hooks/useFetch';

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [loading, setLoading] = useState(false);
    const { courseId, tutorId } = useParams();
    const [tutor, setTutor] = useState<ITutor | null>(null);
    const [course, setCourse] = useState<ICourse | null>(null);
    const ppn = tutor?.price ? parseInt(tutor.price) * 0.1 : 0;
    const totalPrice = tutor?.price ? parseInt(tutor.price) + ppn : 0;

    const handlePaymentChange = (event) => {
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

 

    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response1 = await axios.get(`http://localhost:3002/tutor/getTutor/${tutorId}`); // Replace with your API endpoint 1
                setTutor(response1.data); // Update state with data from API 1
            } catch (error) {
                console.error('Error fetching data from API 1:', error);
            }
        };
        const fetchData2 = async () => {
            try {
                const response2 = await axios.get(`http://localhost:3002/course/getCourse/${courseId}`); // Replace with your API endpoint 2
                setCourse(response2.data); // Update state with data from API 2
            } catch (error) {
                console.error('Error fetching data from API 2:', error);
            }
        };
        fetchData1();
        fetchData2();
    }, []);


    return (
        <>
            <StudentNav />
            <div className='paymentpage-banner'></div>
            { course &&tutor &&
                <div className='paymentpage-container-title-new'>
                <Link to={`/${courseId}/pickTutor/${tutorId}`}><div className='return-button'>return</div></Link>
                <div className='paymentpage-container-title-new-fortitle'>
                    <h1 className='h1-container-paymentpage-new'>Selected Tutor</h1>
                    <h1 className='h1-container-paymentpage-new'>Selected Course</h1>
                </div>
                <div className='paymentpage-container-title-new-fortitle'>
                    <div className='coursecard-container-paymentpage'>
                        <TutorCard
                            rating={tutor?.rating.toFixed(1)}
                            price={tutor?.price}
                            reviewLength={tutor?.reviews.length}
                            name={tutor?.name}
                            img={tutor?.profilePictureURL}
                        >
                        </TutorCard>
                    </div>

                    <div className='coursecard-container-paymentpage'>
                        <CourseCard
                            session={course?.Sessions}
                            chapter={course?.Chapters}
                            title={course?.CourseName}
                            img={course?.CourseImage}
                        >
                        </CourseCard>
                    </div>
                </div>
                <div className='transaction-detail-container-payment-page'>
                    <div className='transaction-detail-title-payment-page'>TRANSACTION DETAIL</div>
                    <div>
                        <div>
                            <span>SELECTED COURSE DETAILS</span>
                            <p>{course?.CourseName}</p>
                            <p>{course?.skill}</p>
                            <p>{course?.totalHours}</p>
                            <p>{course?.Sessions}</p>
                            <p>{course?.Chapters}</p>
                            <p>{tutor?.name}</p>
                        </div>
                        <div>
                            <span>{tutor?.price}</span>
                        </div>
                    </div>
                    <div>
                        <span>PPN (10%)</span>
                        <span>{ppn}</span>
                    </div>

                    <div>
                        <span>Total Price</span>
                        <span>{totalPrice}</span>
                    </div>
                </div>
                <div className='payment-page-submit-payment-form'>
                    <div>
                        <h1>Payment Page</h1>
                        <form onSubmit={handlePaymentSubmit}>
                            <div>
                                <input
                                    type="radio"
                                    id="creditCard"
                                    name="paymentMethod"
                                    value="creditCard"
                                    checked={selectedPayment === 'creditCard'}
                                    onChange={handlePaymentChange}
                                />
                                <label htmlFor="creditCard">Credit Card</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={selectedPayment === 'paypal'}
                                    onChange={handlePaymentChange}
                                />
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="bitcoin"
                                    name="paymentMethod"
                                    value="bitcoin"
                                    checked={selectedPayment === 'bitcoin'}
                                    onChange={handlePaymentChange}
                                />
                                <label htmlFor="bitcoin">Bitcoin</label>
                            </div>

                        </form>
                        <Modal
                            courseData={course}
                            tutorData={tutor}
                            payment={selectedPayment}
                            totalPrice={totalPrice}
                        />
                        {/* {loading && <div className="modal">Processing Payment...</div>} */}
                    </div>

                </div>
            </div>

            }

        </>
    );
};

export default PaymentPage;
