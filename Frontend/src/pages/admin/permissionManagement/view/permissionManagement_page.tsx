import React, { ChangeEvent, useEffect, useState } from 'react';
import AdminNav from '../../../../global/components/navbar/admin/adminNav';
import PermissionTable from '../components/permission_table';
import useFetch from '../../../../global/hooks/useFetch';
import { IReqCourse } from '../../../../global/model/requestCourse-interface';

const PermissionManagementPage = () => {
    const { data: reqcourseDatas } = useFetch("http://localhost:3002/permission/getPermissions");
    const [searchItem, setSearchItem] = useState<IReqCourse[]>([]);

    useEffect(() => {
        if (reqcourseDatas) {
            setSearchItem(reqcourseDatas);
        }
    }, [reqcourseDatas]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        if (search === "") {
            setSearchItem(reqcourseDatas);
        } else {
            setSearchItem(
                reqcourseDatas.filter((courseData: IReqCourse) =>
                    courseData.tutorName.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    };

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
                            <input
                                className="searchBar"
                                placeholder="Search"
                                type="search"
                                onChange={handleInputChange}
                            ></input>
                        </div>
                        <div className="table-section">
                            <PermissionTable reqCourses={searchItem} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionManagementPage;
