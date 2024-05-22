import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Reply {
    id: string;
    senderEmail: string;
    message: string;
}

const RepliesPage = () => {
    const [replies, setReplies] = useState<Reply[]>([]);
    const { forumId } = useParams<{ forumId: string }>();

    const fetchReplies = async () => {
        try {
            const response = await fetch(`http://localhost:3002/forum/forumRoom/${forumId}/Replies`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch replies');
            }
            const data = await response.json();

            if (data && Array.isArray(data.replies)) {
                console.log("Data fetched:", data.replies);
                setReplies(data.replies);
            } else {
                console.error('Data fetched is not in the expected format:', data);
            }
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    }

    useEffect(() => {
        fetchReplies();
    }, [forumId]);

    return (
        <div className="Replies">
            <h1>Replies for Forum ID: {forumId}</h1>
            <ul>
                {replies && replies.map((reply, index) => (
                    <li key={index}>
                        <p>Sender Email: {reply.senderEmail}</p>
                        <p>{reply.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RepliesPage;
