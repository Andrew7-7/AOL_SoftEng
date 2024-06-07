import React, { useState, useEffect } from 'react';
import axios from "axios";
import './reasonModal.css';
import toast from 'react-hot-toast';
import { IReqCourse } from '../../../../global/model/requestCourse-interface';

const ReasonModal: React.FC<{ permissionData: IReqCourse; statusData: string; handleOpen: boolean; onClose: () => void }> = ({ permissionData, statusData, handleOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(handleOpen);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsOpen(handleOpen);
  }, [handleOpen]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      onClose();
    }
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
        <div className="reason-modal-overlay">
          <div className="reason-modal-content">
            <div className='reason-modal-header'>
              <h1>Permission Details</h1>
              <button className='reason-modal-close-btn' onClick={toggleModal}>×</button>
            </div>
            <div className='reason-modal-body'>
              <p>Are you sure to {statusData} this request?</p>
              <p>Tutor's Name: {permissionData.tutorName}</p>
              <p>Requested Class: {permissionData.requestedClass}</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  required
                />
                <button type="submit" className="reason-modal-submit-btn">Add Message</button>
              </form>
            </div>
            <div className="reason-modal-footer">
              <button className='reason-modal-back-btn' onClick={toggleModal}>Back</button>
              <button className='reason-modal-confirm-btn'>
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
