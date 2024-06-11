import React, { useEffect, useState } from "react";
import StudentNav from "../../../global/components/navbar/student/student_navbar";
import "./confirmed_page.css";

const ConfirmedPage = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 50;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StudentNav />
      {/* <div className='paymentpage-banner'></div> */}
      <div className="justifyDivPayment">
        <div className="loading-bar-modal">
          <div className="loading-bar-modal-h1">Processing your order ..</div>
          <div className="loading-bar-modal-h3">Please wait for 2 seconds </div>
          <div className="loading-bar-progress-container">
            <div className="loading-bar-progress-modal-not-completed">
              <div
                className="loading-bar-progress-modal-completed"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
          <div className="loading-bar-modal-h5">
            After this you will be automatically directed to material page
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmedPage;
