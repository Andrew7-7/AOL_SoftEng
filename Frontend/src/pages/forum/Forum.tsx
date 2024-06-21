import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForumId } from './ForumIdContext'; // Import the context hook
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
        senderEmail: string;
        view: number;
        repliesCount: number;
    };
}

const Forum: React.FC<ForumProps> = ({ forum }) => {
    const { id, question, detailSnippet, course, senderEmail, view, repliesCount } = forum;
    const { courseName, color } = course;
    const navigate = useNavigate();
    const { setForumId } = useForumId();

    const incrementViewCount = async () => {
        try {
            const response = await fetch(`http://localhost:3002/forum/incrementView/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to increment view count');
            }
            console.log('View count incremented');
        } catch (error) {
            console.error('Error incrementing view count:', error);
        }
    }

    const handleSeeMore = async () => {
        await incrementViewCount();
        setForumId(id);
        navigate(`/replies/${id}`, { state: { forum } });
    }

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
                    <button onClick={handleSeeMore} className="see-more">see more..</button>
                </div>
            </div>
        </div>
    );
};

export default Forum;
