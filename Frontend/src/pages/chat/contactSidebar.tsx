import React, { useState, useEffect } from 'react';
import './contactSidebar.css';

interface Contact {
    id: number;
    name: string;
}

const ContactSidebar: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/getChat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email1: 'andrew', email2: 'charles' }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch chat room data');
            }

            const data = await response.json();
            const mappedContacts = data.map((email: string, index: number) => ({
                id: index,
                name: email
            }));

            setContacts(mappedContacts);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    return (
        <div className="sidebar">
            <h2>Contacts</h2>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>{contact.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ContactSidebar;

