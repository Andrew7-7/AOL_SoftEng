import React, { useState } from 'react';
import "./addForum.css"; 

const AddForum = () => {
    const user = JSON.parse(window.localStorage.getItem("user") || "{}");
    const [question, setQuestion] = useState('');
    const [detailSnippet, setDetailSnippet] = useState('');
    const [courseName, setCourseName] = useState('');
    const [color, setColor] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/forum/postForum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
                body: JSON.stringify({
                    question,
                    detailSnippet,
                    course: { courseName, color },
                    ForumDetail: {
                        sender: { senderEmail: user.email, senderImageUrl: user.imageURL || '' },
                        imageURL: '',
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add forum');
            }

            const data = await response.json();
            console.log('Forum added:', data);
            setQuestion('');
            setDetailSnippet('');
            setCourseName('');
            setColor('');
        } catch (error) {
            console.error('Error adding forum:', error);
        }
    };

    return (
        <div className="forum-page">
            <div className="forum-header">
                <h1>FORUM PAGE</h1>
                <p>#sharingiscaring</p>
            </div>
            <form className="forum-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question's Title:</label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type here ..."
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={detailSnippet}
                        onChange={(e) => setDetailSnippet(e.target.value)}
                        placeholder="Type here ..."
                    />
                </div>
                <div className="form-group">
                    <label>Related topic(s) to this question:</label>
                    <textarea
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="Type here ..."
                    />
                </div>
                <button type="submit" className="submit-button">Post Question</button>
            </form>
        </div>
    );
};

export default AddForum;
