import React, { useState, createContext, useEffect } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const loadFromLocalStorage = () => {
        try {
            const serializedState = localStorage.getItem("firstlightUser");
            if (serializedState == null) return undefined;
            return JSON.parse(serializedState);
        } catch (err) {
            return null;
        }
    };

    useEffect(() => {
        const state = loadFromLocalStorage();
        setUser(state);
        setIsReady(true);
    }, []);

    return (
        <userContext.Provider value={[user, setUser]}>
            {isReady ? props.children : null}
        </userContext.Provider>
    );
};

export default userContext;
