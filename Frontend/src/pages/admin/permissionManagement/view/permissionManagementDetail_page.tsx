import React, { ChangeEvent, useEffect, useState } from 'react';
import AdminNav from '../../../../global/components/navbar/admin/adminNav';
import { IReqCourse } from '../../../../global/model/requestCourse-interface';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PermissionManagementDetailPage = () => {
    const {permissionId} = useParams()
    const [reqCourse, setreqCourse] = useState<IReqCourse | null>(null);

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
                            <div className="header">Permission Management</div>
                        </div>
                        <div className="top-section">
                        </div>
                        <div className="table-section">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionManagementDetailPage;
