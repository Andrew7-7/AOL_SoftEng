import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Forum from '../forum/Forum';

const ForumPage = () => {
    const [forums, setForums] = useState([]);

    const fetchForums = async () => {
        try {
            const response = await fetch(`http://localhost:3002/forum/getForum`, {
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
            console.log("Data fetched:", data);
            console.log("set forums:",setForums(data.forums));
        } catch (error) {
            console.error('Error fetching forums:', error);
        }
    };

    useEffect(() => {
        fetchForums();
    }, []);

    return (
        <div>
            <div>
                <button><Link to={`/addForum`}>Ask Question</Link></button>
            </div>
            <div className="forums">
                <h1>Forums</h1>
                {forums && forums.map((forum, index) => (
                    <Forum key={index} forum={forum} />
                ))}
            </div>
        </div>
    );
};

export default ForumPage;