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
    const user = JSON.parse(window.localStorage.getItem("user") || "{}");
    const [replies, setReplies] = useState<Reply[]>([]);
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

    const addReply = async () => {
        try {
            const response = await fetch(`http://localhost:3002/forum/forumRoom/${forumId}/SendReply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
                body: JSON.stringify({ message: newReply, senderEmail: user.email })
            });
            if (!response.ok) {
                throw new Error('Failed to add reply');
            }
            setNewReply('');
            fetchReplies();
        } catch (error) {
            console.log('Error adding reply', error);
        }
    };

    const editReply = (reply: Reply) => {
        setEditReplyId(reply.id);
        setEditReplyMessage(reply.message);
    };

    const updateReply = async () => {
        if (!editReplyId) return;

        try {
            const response = await fetch(`http://localhost:3002/forum/forumRoom/${forumId}/replies/${editReplyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
                body: JSON.stringify({ message: editReplyMessage })
            });
            if (!response.ok) {
                throw new Error('Failed to update reply');
            }
            setEditReplyId(null);
            setEditReplyMessage('');
            fetchReplies();
        } catch (error) {
            console.log('Error updating reply:', error);
        }
    };

    const deleteReply = async (replyId: string) => {
        try {
            const response = await fetch(`http://localhost:3002/forum/forum/${forumId}/replies/${replyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete reply');
            }
            fetchReplies();
        } catch (error) {
            console.log('Error deleting reply:', error);
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
                <p>Sender Email: {details.sender.senderEmail} <br />
                    Sender PFP: <img src={details.sender.senderImageURL} alt="Profile" /></p>
            )}

            <div>
                <h2>Add a Reply</h2>
                <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Type your reply here..."
                />
                <button onClick={addReply}>Add Reply</button>
            </div>

            <ul>
                {replies.map((reply) => (
                    <li key={reply.id}>
                        <p>Reply Email: {reply.senderEmail}</p>
                        <p>{reply.message}</p>
                        {reply.senderEmail === user.email && (
                            <>
                                <button onClick={() => editReply(reply)}>Edit</button>
                                <button onClick={() => deleteReply(reply.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {editReplyId && (
                <div>
                    <h2>Edit Reply</h2>
                    <textarea
                        value={editReplyMessage}
                        onChange={(e) => setEditReplyMessage(e.target.value)}
                        placeholder="Edit your reply here..."
                    />
                    <button onClick={updateReply}>Update Reply</button>
                    <button onClick={() => setEditReplyId(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default RepliesPage;
