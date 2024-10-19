import React, { useContext } from 'react';
import HomePage from './homepage';
import LoginPage from './loginpage';
import S_ADMIN from './SuperAdmin';
import TBI_ADMIN from './component/tbi-admin';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './component/authContext';
import SignupForm from './component/sign_up';

const App = () => {
    const { currentUser, userRole } = useContext(AuthContext); // Update to userType

    const RequireAuth = ({ children, requiredRole }) => {
        // Redirect to login if not authenticated
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        // Check if the current user type matches the required role
        if (requiredRole && userRole !== requiredRole) {
            console.log(currentUser, userRole); // Debugging info
            // Redirect based on userType
            switch (userRole) {
                case "1":
                    return <Navigate to="/s-admin" />;
                case "2":
                    return <Navigate to="/tbi-admin" />;
                case "3":
                    return <Navigate to="/incubee-admin" />;
                case "4":
                    return <Navigate to="/investor-admin" />;
                default:
                    return <Navigate to="/" />; // Fallback for unexpected user types
            }
        }

        return children; // If logged in and authorized, render the children
    };

    return (
        <>
            <Routes>
                <Route 
                    path='/s-admin' 
                    element={
                        <RequireAuth requiredRole={"1"}>
                            <S_ADMIN />
                        </RequireAuth>
                    }
                />
                <Route 
                    path='/tbi-admin' 
                    element={
                        <RequireAuth requiredRole={"2"}>
                            <TBI_ADMIN />
                        </RequireAuth>
                    }
                />
                <Route index path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route index path='/signUp' element={<SignupForm />} />
            </Routes>
        </>
    );
};

export default App;
