import React, { MouseEventHandler, useState, useEffect } from 'react';
import axios from "axios";
import './reasonModal.css';
import { Link, useNavigate } from 'react-router-dom'
import { IReqCourse } from '../../../../global/model/requestCourse-interface';
const ReasonModal: React.FC<{ permissionData: IReqCourse;statusData:string;handleOpen:boolean}> = ({ permissionData, statusData, handleOpen}) => {
  const [isOpen, setIsOpen] = useState(handleOpen);
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const navigate = useNavigate()

  useEffect(() => {

  }, []);

  const toggleModal = () => {
    
    navigate('/permissionManagement')
    // setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-paymentpage">
          <div className="modal-content-paymentpage">
            <div className='modal-content-paymentpage-title-container'>
              <h1>
                Permission Details
              </h1>
              <div className='line-confirmModal'></div>
              <h2>
                Are you sure to {statusData} this request ?
              </h2>
              <h2>
              Requested Class : {permissionData.requestedClass}
              </h2>
              {/* todo: blob,  status */}
            </div>
            <div className="chapterbreakdown-container-coursedetail-paymentpage">
              {/* <button
                onClick={toggleModal}
              >
                BACK
              </button> */}
              <Link to={'/permissionManagement'}>
              </Link>
              <button className='chapterbreakdown-container-coursedetail-paymentpage-accept-btn'
              >
                {statusData.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReasonModal;
