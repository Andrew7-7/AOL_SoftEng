import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from "axios";
import './reasonModal.css';
import toast from 'react-hot-toast';
import { IReqCourse } from '../../../../global/model/requestCourse-interface';
import { useNavigate } from 'react-router-dom';

const ReasonModal: React.FC<{ permissionData: IReqCourse; statusData: string; handleOpen: boolean; onClose: () => void }> = ({ permissionData, statusData, handleOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(handleOpen);
  const [message, setMessage] = useState('');
  const [statusForm, setStatusForm] = useState('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [error, setError] = useState({
    message: "",
    show: false,
  });
  const [success, setSuccess] = useState({
    message: "",
    show: false,
  });

  const navigate = useNavigate()

  useEffect(() => {
    setIsOpen(handleOpen);
  }, [handleOpen]);

  useEffect(() => {
    if (permissionData) {
      resetForm();
    }
  }, [permissionData]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      onClose();
    }
  };

  const [permissionFormData, setPermissionFormData] = useState({
    id: "",
    message: "",
    permissionID: "",
    requestedClass: "",
    status: "",
    tutorName: "",
    certificateImg: "",
  });

  const resetForm = () => {
    setPermissionFormData({
      id: permissionData.id,
      message: permissionData.message,
      permissionID: permissionData.permissionID,
      requestedClass: permissionData.requestedClass,
      status: permissionData.status,
      tutorName: permissionData.tutorName,
      certificateImg: permissionData.certificateImg,
    });
    setMessage(permissionData.message);
    setStatusForm(permissionData.status);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setPermissionFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'message') {
      setMessage(value);
    }
  };

  const handleError = (message: string) => {
    setError({
      message: message,
      show: true,
    });
    setTimeout(() => {
      setError({
        message: message,
        show: false,
      });
    }, 5000);
  };

  const handleSuccess = (message: string) => {
    setSuccess({
      message: message,
      show: true,
    });
    setTimeout(() => {
      setSuccess({
        message: message,
        show: false,
      });
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error('Please fill in the required field.');
      return;
    }

    setSubmitLoading(true);
    try {
      const {
        id,
        message,
        permissionID,
        requestedClass,
        tutorName,
        certificateImg,
      } = permissionFormData;

      const status = statusData === 'Accept' ? 'Accepted' : 'Denied';

      const res = await axios.post(
        `http://localhost:3002/permission/updatePermission`,
        {
          id,
          message,
          permissionID,
          requestedClass,
          status,
          tutorName,
          certificateImg,
        },
        {
          headers: {
            "Content-Type": "application/json", // Use application/json for JSON data
          },
        }
      );

      handleSuccess(res.data.message);
      navigate("/permissionManagement")
    } catch (error: any) {
      console.error(error);
      handleError('An error occurred while submitting the form.');
    } finally {
      setSubmitLoading(false);
    }
  };


  const handleStatusChange = () => {
    setStatusForm(statusData === 'Accept' ? 'Accepted' : 'Denied');
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
                  name="message"
                  value={message}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  required
                />
                <button type="submit" className="reason-modal-submit-btn" disabled={submitLoading}>
                  {submitLoading ? 'Submitting...' : statusData}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReasonModal;
