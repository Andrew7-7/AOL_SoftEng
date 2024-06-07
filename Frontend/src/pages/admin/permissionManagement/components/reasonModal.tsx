import React, { MouseEventHandler, useState, useEffect } from 'react';
import axios from "axios";
import './reasonModal.css';
import toast from 'react-hot-toast';
import { IReqCourse } from '../../../../global/model/requestCourse-interface';

const ReasonModal: React.FC<{ permissionData: IReqCourse; statusData: string; handleOpen: boolean }> = ({ permissionData, statusData, handleOpen }) => {
  const [isOpen, setIsOpen] = useState(handleOpen);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  
  useEffect(() => {
    setIsOpen(handleOpen);
  }, [handleOpen]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      toast.error('Please fill in the required field.');
      return;
    }
    
    // Update status here
    console.log('Form submitted with value:', inputValue);
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-paymentpage">
          <div className="modal-content-paymentpage">
            <div className='modal-content-paymentpage-title-container'>
              <h1>Permission Details</h1>
              <div className='line-confirmModal'></div>
              <h2>Are you sure to {statusData} this request?</h2>
              <h2>Tutor's Name: {permissionData.tutorName}</h2>
              <h2>Requested Class: {permissionData.requestedClass}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type something..."
                  required
                />
                <button type="submit">Add Message</button>
              </form>
            </div>
            <div className="chapterbreakdown-container-coursedetail-paymentpage">
              <button className='chapterbreakdown-container-coursedetail-paymentpage-back-btn' onClick={toggleModal}>BACK</button>
              <button className='chapterbreakdown-container-coursedetail-paymentpage-accept-btn'>
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
