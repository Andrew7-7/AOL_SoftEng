import React, { useState } from 'react';
import './payment_page.css';
import StudentNav from '../../../global/components/navbar/student/student_navbar';
import { Card } from '../components/courseCard';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../../global/hooks/useFetch';

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [loading, setLoading] = useState(false);
    const { courseId, tutorId } = useParams();

    const { data: courseData } = useFetch(
        `http://localhost:3002/course/getCourseById/${courseId}`
      );
      console.log(courseData)

     const { data: tutorData } = useFetch(
        `http://localhost:3002/tutor/getTutor/${tutorId}`
      );
      console.log(tutorData)

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

    return (
        <>
            <StudentNav />
            <div className='paymentpage-banner'></div>
            <div className='paymentpage-container-title-new'>
                {/* <Link to={`/${courseId}/pickTutor/${tutorId}`}><div className='return-button'>return</div></Link> */}
                <div className='paymentpage-container-title-new-fortitle'>
                    <h1 className='h1-container-paymentpage-new'>Selected Tutor</h1>
                    <h1 className='h1-container-paymentpage-new'>Selected Course</h1>
                </div>
                <div className='paymentpage-container-title-new-fortitle'>
                    <div className='coursecard-container-paymentpage'><Card></Card></div>
                    <div className='coursecard-container-paymentpage'><Card></Card></div>
                </div>

            </div>
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
                    {/* Add more payment options as needed */}
                    <button type="submit">Submit Payment</button>
                </form>
                {loading && <div className="modal">Processing Payment...</div>}
            </div>
        </>
    );
};

export default PaymentPage;
