import { Link } from 'react-router-dom';
import "./Forum.css";

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
        <div className="forum-item">
            <div className="forum-header">
                <h2 className="forum-question">{question}</h2>
                <div className="forum-details">
                    <p className="forum-snippet">{detailSnippet}</p>
                    <div className="forum-meta">
                        <span className="forum-course" style={{ backgroundColor: color }}>{courseName}</span>
                        <span className="forum-replies">{repliesCount} replies</span>

                    </div>
                    <Link to={`/replies/${id}`} className="see-more">see more..</Link>
                </div>

            </div>
        </div>
    );
};

export default Forum;
