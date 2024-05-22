import { Link } from 'react-router-dom';
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
    const { id, question, detailSnippet, course, view, repliesCount } = forum;
    const { courseName, color } = course;

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
                <button><Link to={`/replies/${id}`}>See More</Link></button>
            </div>
        </div>
    );
};

export default Forum;
