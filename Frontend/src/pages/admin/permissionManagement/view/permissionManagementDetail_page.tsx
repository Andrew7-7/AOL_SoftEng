import React, { useEffect, useState } from 'react';
import AdminNav from '../../../../global/components/navbar/admin/adminNav';
import { IReqCourse } from '../../../../global/model/requestCourse-interface';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './permissionManagementDetail_page.css';
import ReasonModal from '../components/reasonModal';

const PermissionManagementDetailPage = () => {
    const { permissionId } = useParams();
    const [reqCourse, setReqCourse] = useState<IReqCourse | null>(null);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isDenying, setIsDenying] = useState(false);

    const handleAccept = () => {
        setIsAccepting(true);
        setIsDenying(false); // Ensure denying is reset
    };

    const handleDeny = () => {
        setIsDenying(true);
        setIsAccepting(false); // Ensure accepting is reset
    };

    const handleCloseModal = () => {
        setIsAccepting(false);
        setIsDenying(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/permission/getPermission/${permissionId}`);
                setReqCourse(response.data);
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        };
        fetchData();
    }, [permissionId]);

    const openImageInNewWindow = (imageUrl: string) => {
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`<img src="${imageUrl}" alt="Certification Image" style="width:100%;">`);
            newWindow.document.title = "Certification Image";
        }
    };

    return (
        <div className="permission-management-detail-page">
            <AdminNav clickedItem="Permission" />
            <div className="permission-management-detail-content-section">
                <div className="permission-management-detail-page-center">
                    <div className="permission-management-detail-content-container">
                        <div className="permission-management-detail-header-section">
                            <h1 className="permission-management-detail-header">Permission Management Detail</h1>
                            <Link to="/permissionManagement" className="permission-management-detail-back-link">Back</Link>
                        </div>
                        <div className="permission-management-detail-details-section">
                            <div className="permission-management-detail-item">
                                <span className="permission-management-detail-title">Permission ID:</span>
                                <span className="permission-management-detail-content">{reqCourse?.permissionID}</span>
                            </div>
                            <div className="permission-management-detail-item">
                                <span className="permission-management-detail-title">Tutor Name:</span>
                                <span className="permission-management-detail-content">{reqCourse?.tutorName}</span>
                            </div>
                            <div className="permission-management-detail-item">
                                <span className="permission-management-detail-title">Requested Course:</span>
                                <span className="permission-management-detail-content">{reqCourse?.requestedClass}</span>
                            </div>
                            <div className="permission-management-detail-item-certification">
                                <span className="permission-management-detail-title">Certification Image:</span>
                                <div className="permission-management-detail-content-image-container">
                                    <img
                                        src={reqCourse?.certificateImg}
                                        className="permission-management-detail-content-image"
                                        alt="Certification"
                                        onClick={() => openImageInNewWindow(reqCourse?.certificateImg!)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <span className='permission-management-detail-info'>Please Click to see the full size of the picture</span>
                            </div>
                            <div className="permission-management-detail-button-container">
                                <button className="permission-management-detail-action-button accept" onClick={handleAccept}>Accept</button>
                                <button className="permission-management-detail-action-button deny" onClick={handleDeny}>Deny</button>
                            </div>
                        </div>
                        {reqCourse && (isAccepting || isDenying) && (
                            <div className="permission-management-detail-reason-section">
                                <ReasonModal
                                    permissionData={reqCourse}
                                    statusData={isAccepting ? "Accept" : "Deny"}
                                    handleOpen={true}
                                    onClose={handleCloseModal}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionManagementDetailPage;
