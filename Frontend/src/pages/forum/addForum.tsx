import React, { useState } from 'react';

const AddForum = () => {
    const [question, setQuestion] = useState('');
    const [detailSnippet, setDetailSnippet] = useState('');
    const [courseName, setCourseName] = useState('');
    const [color, setColor] = useState('');
    const view = 0;

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
                    view,
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Question:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div>
                <label>Detail Snippet:</label>
                <input type="text" value={detailSnippet} onChange={(e) => setDetailSnippet(e.target.value)} />
            </div>
            <div>
                <label>Course Name:</label>
                <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
            </div>
            <div>
                <label>Color:</label>
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <button type="submit">Add Forum</button>
        </form>
    );
};

export default AddForum;
