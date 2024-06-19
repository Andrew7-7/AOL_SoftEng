import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import './RepliesPage.css';
import StudentNav from '../../global/components/navbar/student/student_navbar';

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
    const user = JSON.parse(window.localStorage.getItem("user") || "{}");
    const [replies, setReplies] = useState<Reply[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { forumId } = useParams<{ forumId: string }>();
    const location = useLocation();
    const forum = location.state?.forum as Forum;
    const [details, setDetails] = useState<ForumDetails | null>(null);
    const [newReply, setNewReply] = useState<string>('');
    const [editReplyId, setEditReplyId] = useState<string | null>(null);
    const [editReplyMessage, setEditReplyMessage] = useState<string>('');

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
                setError('Unexpected response format');
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReplies();
        fetchDetails();
    }, [forumId]);

    if (loading) {
        return <div className="Replies">Loading...</div>;
    }

    if (error) {
        return <div className="Replies">Error: {error}</div>;
    }

    return (
        <div className="Replies">


            <StudentNav />
            <div className="forum-header">
                <h1>FORUM PAGE</h1>
                <div className="sharing-banner">#sharingiscaring</div>
            </div>
            <ul>
                {replies.map((reply, index) => (
                    <li key={index} className="reply-item">
                        <div className="reply-content">
                            <h2 className="reply-title">Title Placeholder</h2>
                            <p className="reply-message">{reply.message}</p>
                            <p className="reply-meta">
                                <span className="sender-email">{reply.senderEmail}</span>
                                <span className="reply-count">{index + 1} replies</span>
                            </p>
                            <button className="see-more">see more..</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button className="page-btn">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span>...</span>
            </div>
        </div>
    );
};

export default RepliesPage;
