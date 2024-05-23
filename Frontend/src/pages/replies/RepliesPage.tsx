import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

interface Reply {
    id: string;
    senderEmail: string;
    message: string;
}

interface Forum {
    id: string;
    question: string;
    detailSnippet: string;
    senderEmail: string;
    course: {
        courseName: string;
        color: string;
    };
    view: number;
    repliesCount: number;
}

interface ForumDetails {
    sender: {
        senderEmail: string;
        senderImageURL: string;
    };
}

const RepliesPage = () => {
    const [replies, setReplies] = useState<Reply[]>([]);
    const { forumId } = useParams<{ forumId: string }>();
    const location = useLocation();
    const forum = location.state?.forum as Forum;
    const [details, setDetails] = useState<ForumDetails | null>(null);

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
            console.log("Replies fetched:", data.replies);
            if (data && Array.isArray(data.replies)) {
                setReplies(data.replies);
            } else {
                console.error('Data fetched is not in the expected format:', data);
            }
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    const fetchDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3002/forum/forumRoom/${forumId}/ForumDetail`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch forum details');
            }
            const data = await response.json();
            console.log("Details fetched:", data);
            if (data && Array.isArray(data.forumDetails) && data.forumDetails.length > 0) {
                setDetails(data.forumDetails[0]);
            } else {
                console.error('Data fetched is not in the expected format:', data);
            }
        } catch (error) {
            console.log('Error fetching details:', error);
        }
    };

    useEffect(() => {
        fetchReplies();
        fetchDetails();
    }, [forumId]);

    return (
        <div className="Replies">
            <h1>Replies for Forum: {forum?.question}</h1>
            {details && details.sender && (
                <p>Sender Email: {details.sender.senderEmail}</p>
            )}
            <ul>
                {replies.map((reply, index) => (
                    <li key={index}>
                        <p>Reply Email: {reply.senderEmail}</p>
                        <p>{reply.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepliesPage;
