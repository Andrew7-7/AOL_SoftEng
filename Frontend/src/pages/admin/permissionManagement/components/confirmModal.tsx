import React, { MouseEventHandler, useState, useEffect } from 'react';
import axios from "axios";
import './confirmModal.css';
import { useNavigate } from 'react-router-dom'
import { IReqCourse } from '../../../../global/model/requestCourse-interface';
import ReasonModal from './reasonModal';
const Modal: React.FC<{ permissionData: IReqCourse;}> = ({ permissionData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false)
  const [isDenying, setIsDenying] = useState(false)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {

  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleAccept = () => {
    setIsAccepting(true);

  };

  const handleDeny = () => {
    setIsDenying(true);
  };
  const handleidk = ()=>{
    setIsOpen(false)
    setIsAccepting(true)
  }


  return (
    <div>
      <button className="chapterbreakdown-set-coursedetail-3-paymentpage"
        onClick={toggleModal}>
        details
      </button>
      {isOpen && (
        <div className="modal-paymentpage">
          <div className="modal-content-paymentpage">
            <div className='modal-content-paymentpage-title-container'>
              <h1>
                Permission Details
              </h1>
              <div className='line-confirmModal'></div>
              <h2>
                Tutor's Name : {permissionData.tutorName}
              </h2>
              <h2>
              Requested Class : {permissionData.requestedClass}
              </h2>
              <div className='image-container-confirmmodal-permission-management'>
              <img className="certificate-image-confirm-modal" src={permissionData.certificateImg} />
              </div>
              {/* todo: blob,  status */}
            </div>
            <div className="chapterbreakdown-container-coursedetail-paymentpage">
            <button className='chapterbreakdown-container-coursedetail-paymentpage-deny-btn'
            onClick={handleDeny}
              >
                DENY
              </button>
              <button
                onClick={toggleModal}
              >
                BACK
              </button>
              <button className='chapterbreakdown-container-coursedetail-paymentpage-accept-btn'
              onClick={handleidk}
              >
                ACCEPT
              </button>
              {isAccepting && <ReasonModal  onClose={() => setIsOpenModal1(false)}
              permissionData={permissionData} statusData={'Accept'} handleOpen={true}/>}
              {isDenying && <ReasonModal permissionData={permissionData} statusData={'Deny'} handleOpen={true}/>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
