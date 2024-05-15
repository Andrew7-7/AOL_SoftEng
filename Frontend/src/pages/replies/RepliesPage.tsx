import React, { useState, useEffect } from 'react';

const RepliesPage = () => {
    const [replies, setReplies] = useState([]);
    const forumsId = 'bUZRaEVStHojYMcQtp2m'
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
            console.log("set forums:", setForums(data.forums));
        } catch (error) {
            console.error('Error fetching forums:', error);
        }
    };

    const fetchReplies = async () => {
        try {
            const response = await fetch(`http://localhost:3002/forum/forumRoom/${forumsId}`, {
                method: 'GET',
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
            setReplies(data);
        } catch (error) {
            console.error('Error fetching forums:', error);
        }
    }

    useEffect(() => {
        fetchForums();
        fetchReplies();
    },[])

    return (
        <div className="Replies">
            <h1>Forums</h1>
        </div>
    );
}

export default RepliesPage;