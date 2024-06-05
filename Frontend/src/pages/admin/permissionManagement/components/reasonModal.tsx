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

  // Event handler to update the input value state
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    if (!inputValue.trim()) { // Check if input is empty or whitespace
      toast.error('Please fill in the required field.'); // Show error toast
      return;
    }
    //update status 
    // Handle form submission here
    // For example, you can send the input value to a server or perform any other action
    console.log('Form submitted with value:', inputValue);
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
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type something..."
                  required // Make the field required
                />
                <button type="submit">Submit</button>
              </form>
              {/* todo: blob,  status */}
            </div>
            <div className="chapterbreakdown-container-coursedetail-paymentpage">
              <button onClick={toggleModal}>
                BACK
              </button>
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
