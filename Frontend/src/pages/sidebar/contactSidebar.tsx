import React, { useState, useEffect } from 'react';
import './contactSidebar.css';
// import firebase from 'firebase/app';
// import { Firestore } from 'firebase/firestore';

const ContactSidebar: React.FC = () => {

    interface Chat {
        id: string;
        lastTimeStamp: string;
        email1: string;
        email2: string;
    }

    const [contacts, setContacts] = useState<{ roomId: string; email: string }[]>([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`http://localhost:3002/chat/getChat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': 'Bearer aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k'
                },
                body: JSON.stringify({ email: 'andrew' }), 
            });

            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }

            const data = await response.json();
            console.log("data: ",data)

            const chatArray = data.chat || [];

            const filteredContacts = chatArray.map((chat: Chat) => ({
                email: chat.email1 !== 'andrew' ? chat.email1 : chat.email2,
                roomId: chat.id
            }));

            setContacts(filteredContacts);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    return (
        <div className="sidebar">
            <h2>Contacts</h2>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.roomId}>
                        <button onClick={() => console.log("Room ID:", contact.roomId)}>
                            {contact.email}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactSidebar;

