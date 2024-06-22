import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Forum from '../forum/Forum';
import './forumPage.css';
import StudentNav from '../../global/components/navbar/student/student_navbar';

const ForumPage = () => {
    const [forums, setForums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const forumsPerPage = 4;

    const fetchForums = async () => {
        try {
            const response = await fetch('http://localhost:3002/forum/getForum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch forums');
            }
            const data = await response.json();
            setForums(data.forums);
        } catch (error) {
            console.error('Error fetching forums:', error);
        }
    };

    useEffect(() => {
        fetchForums();
    }, []);

    const indexOfLastForum = currentPage * forumsPerPage;
    const indexOfFirstForum = indexOfLastForum - forumsPerPage;
    const currentForums = forums.slice(indexOfFirstForum, indexOfLastForum);

    const paginate = (pageNumber:any) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(forums.length / forumsPerPage);

    return (
        <div>

            <StudentNav />
            <div className="forum-page-banner-sharing-iscaring"></div>
            <Link to={"/"} className='backForum'>Back</Link>
            <div className="forum-page-real">
                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {totalPages > 3 && <span>...</span>}
                    <Link to={'/add'} className='askQuestionForum'>Ask Question</Link>
                </div>
                <div className="forums">
                    {currentForums.map((forum, index) => (
                        <Forum key={index} forum={forum} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForumPage;
