import React, { useState } from 'react';
import "./forumPage.css";

interface ForumProps {
    forum: {
        id: string;
        question: string;
        detailSnippet: string;
        course: {
            courseName: string;
            color: string;
        };
        view: number;
        repliesCount: number;
    };
}

const Forum: React.FC<ForumProps> = ({ forum }) => {
    const { question, detailSnippet, course, view, repliesCount } = forum;
    const { courseName, color } = course;
    const [showReplies, setShowReplies] = useState(false);

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className="forum">
            <h2>{question}</h2>
            <p>{detailSnippet}</p>
            <div>
                <h3>Course</h3>
                <p>Color: {color}</p>
                <p>Views: {view}</p>
                <p>Course Name: {courseName}</p>
                <p>{repliesCount} Replies</p>
                {showReplies && (
                    <div>
                        {/* Render replies here */}
                    </div>
                )}
                <button onClick={toggleReplies}>See More</button>
            </div>
        </div>
    );
};

export default Forum;
