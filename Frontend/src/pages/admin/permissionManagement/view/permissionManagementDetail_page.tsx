import React, { ChangeEvent, useEffect, useState } from 'react';
import AdminNav from '../../../../global/components/navbar/admin/adminNav';
import { IReqCourse } from '../../../../global/model/requestCourse-interface';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './permissionManagementDetail_page.css'
import ReasonModal from '../components/reasonModal';
const PermissionManagementDetailPage = () => {
    const { permissionId } = useParams()
    const [reqCourse, setreqCourse] = useState<IReqCourse | null>(null);
    const [isAccepting, setIsAccepting] = useState(false)
    const [isDenying, setIsDenying] = useState(false)

    const handleAccept = () => {
        setIsAccepting(true);
    };
    const handleDeny = () => {
        setIsDenying(true);
    };
    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response1 = await axios.get(`http://localhost:3002/permission/getPermission/${permissionId}`);
                setreqCourse(response1.data)
            } catch (error) {
                console.error('Error fetching data from API 1:', error);
            }
        };
        fetchData1();
    }, []);

    return (
        <div className="course-management-page">
            <AdminNav clickedItem="Permission" />
            <div className="content-section">
                <div className="page-center">
                    <div className="content-container">
                        <div className="header-section">
                            <div className="header">Permission Management Detail</div>
                            <Link to={"/permissionManagement"}>back</Link>
                        </div>
                        <div className="top-section">

                        </div>
                        <div className="table-section-permission-detail">
                            <div>
                                <div>Permission Id</div>
                                <div>{reqCourse?.permissionID}</div>
                            </div>
                            <div>
                                <div>Tutor Name</div>
                                <div>{reqCourse?.tutorName}</div>
                            </div>
                            <div>
                                <div>Requested Course</div>
                                <div>{reqCourse?.requestedClass}</div>
                            </div>
                            <div>
                                <div>Requested Course</div>
                                {/* <img src={reqCourse?.certificateImg} /> */}
                            </div>
                            {reqCourse && <div>
                                <button  onClick={handleAccept}>
                                    ACCEPT
                                </button>
                                <button  onClick={handleDeny}>
                                    DENY
                                </button>
                            </div>}
                            {reqCourse && isAccepting && <ReasonModal permissionData={reqCourse} statusData={'Accept'} handleOpen={true}/>}
                            {reqCourse && isDenying && <ReasonModal permissionData={reqCourse} statusData={'Deny'} handleOpen={true}/>}
                            {/* course details, tutor details */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionManagementDetailPage;
