import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Load the full user object from localStorage if available
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const loginUser = (userData) => {
        setUser(userData); // Set the full user object to the context
        localStorage.setItem('user', JSON.stringify(userData)); // Save the user object to localStorage
    };

    const logoutUser = () => {
        setUser(null); // Remove the user from context
        localStorage.removeItem('user'); // Remove the user from localStorage
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
