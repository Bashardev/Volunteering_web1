import { createContext, useState, useEffect } from "react";

// Create a Context for Authentication
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Initialize login state based on localStorage token
        const token = localStorage.getItem("userToken");
        setIsLoggedIn(!!token);
    }, []);

    const login = (token) => {
        // Save token to localStorage and update state
        localStorage.setItem("userToken", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Remove token and update state
        localStorage.removeItem("userToken");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
