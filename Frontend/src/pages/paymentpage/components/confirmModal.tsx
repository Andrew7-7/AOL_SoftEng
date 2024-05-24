import React, { useState } from 'react';
import './confirmModal.css';
import { ICourse } from '../../../global/model/course-interface';
import { useNavigate } from 'react-router-dom';
import { ITutor } from '../../../global/model/tutor-interface';

const Modal: React.FC<{ courseData: ICourse; tutorData: ITutor }> = ({ courseData, tutorData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleYes = () => {
    // navigate
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
              <button
              onClick={handleYes}>yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
