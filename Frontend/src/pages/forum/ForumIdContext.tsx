import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ForumIdContextType {
    forumId: string | null;
    setForumId: (id: string | null) => void;
}

const ForumIdContext = createContext<ForumIdContextType>({
    forumId: null,
    setForumId: () => { }, // Placeholder function
});

export const useForumId = () => useContext(ForumIdContext);

interface ForumIdProviderProps {
    children: ReactNode;
}

export const ForumIdProvider: React.FC<ForumIdProviderProps> = ({ children }) => {
    const [forumId, setForumId] = useState<string | null>(null);

    const setAndSaveForumId = (id: string | null) => {
        setForumId(id);
    };

    return (
        <ForumIdContext.Provider value={{ forumId, setForumId: setAndSaveForumId }}>
            {children}
        </ForumIdContext.Provider>
    );
};
