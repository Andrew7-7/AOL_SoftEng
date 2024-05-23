import { useNavigate } from 'react-router-dom';
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
        senderEmail: string;
        view: number;
        repliesCount: number;
    };
}

const Forum: React.FC<ForumProps> = ({ forum }) => {
    const { id, question, detailSnippet, course, senderEmail, view, repliesCount } = forum;
    const { courseName, color } = course;
    const navigate = useNavigate();

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
        navigate(`/replies/${id}`, { state: { forum } });
    }

    return (
        <div className="forum">
            <h2>{question}</h2>
            <p>{detailSnippet}</p>
            <div>
                <h3>Course</h3>
                <p>Color: {color}</p>
                <p>Views: {view}</p>
                <p>Course Name: {courseName}</p>
                <p>Sender Email: {senderEmail}</p>
                <p>{repliesCount} Replies</p>
                <button onClick={handleSeeMore}>See More</button>
            </div>
        </div>
    );
};

export default Forum;
