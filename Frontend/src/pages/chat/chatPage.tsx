import { useParams } from 'react-router-dom';
import './chatPage.css';
import { useEffect, useState } from 'react';
interface Message {
    id: string;
    attachment: string;
    email: string;
    message: string;
    timestamp: string;
}

const ChatPage = () => {
    const { roomId } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:3002/chat/chatRoom/1/Messages`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                console.log("Fetched data:", data);
                if (Array.isArray(data.messages)) {
                    const sortedMessages = data.messages.sort((a: Message, b: Message) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                    setMessages(sortedMessages);
                } else {
                    console.error("Messages array not found in data:", data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [roomId]);

    const sendMessageBody = {
        roomID: "1",
        user: "andrew",
        message: messageInput,
        attachment: "-"
    }

    const sendMessage = async () => {
        try {
            const response = await fetch(`http://localhost:3002/chat/postMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
                body: JSON.stringify(sendMessageBody)
            })
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.email === 'andrew' ? 'sent' : 'received'}`}>
                        <p>{message.email}: {message.message}</p>
                        <p className="timestamp">{new Date(message.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
