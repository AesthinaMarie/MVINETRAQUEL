import { createContext, useEffect, useReducer } from "react";
import AuthReducer from './authReducer';

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("User")) || null,
    userRole: JSON.parse(localStorage.getItem("UserRole")) || null, // Initialize userRole from localStorage if available
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("User", JSON.stringify(state.currentUser));
        localStorage.setItem("UserRole", JSON.stringify(state.userRole)); // Store userRole in localStorage
    }, [state.currentUser, state.userRole]); // Add userRole to dependency array

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, userRole: state.userRole, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
