import React, { useState } from 'react';
import './modal.css';
import { ICourse } from '../../../global/model/course-interface';


const Modal: React.FC<{ courseData: ICourse }> = ({ courseData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="chapterbreakdown-set-coursedetail-3" onClick={toggleModal}>See All Chapter Breakdowns</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={toggleModal}>&times;</button>
            <h2>ALL Chapters Breakdown </h2>
            <div className=".chapterbreakdown-container-coursedetail">
              {courseData.chapterBreakdown.map((name, index) => (
                <div className="chapterbreakdown-set-coursedetail" key={index}>
                  Chapter {index + 1} : {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
