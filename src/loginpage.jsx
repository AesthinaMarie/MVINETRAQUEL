// src/Login.js
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from './assets/Logo.png';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from './component/firebase'
import { AuthContext } from './component/authContext';
import {doc, getDoc } from 'firebase/firestore';
import Navbar from './component/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true); // Optionally set loading state
      setError(null); // Reset error state

      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Check if the email is the specific one
          if (email === "callmedaddymarie@gmail.com") {
              dispatch({ type: "LOGIN", payload: { user, userRole : "1"} });
              navigate('/s-admin'); // Adjusted for the specific admin email
          } else {
              // Fetch user type from Firestore
              const userDoc = await getDoc(doc(db, "users", user.uid)); // Adjust the path if necessary
              if (userDoc.exists()) {
                  const userData = userDoc.data();
                  const userType = userData.userType; // Assuming userType is stored in your document

                  // Dispatch the user role
                  dispatch({ type: "LOGIN", payload: { user, userRole: userType } });

                  console.log(userType)
                  // Redirect based on user type
                  if (userType === "2") {
                      navigate('/tbi-admin'); // For userType 1 (TBI Admin)
                  } else if (userType === "3") {
                      navigate('/user-page'); // For userType 2 (Incbuee User)
                    } else if (userType === "4") {
                      navigate('/user-page'); // For userType 2 (Investor User)
                  } else {
                      navigate('/'); // Fallback for other cases
                  }
              } else {
                  console.error("No such user document!");
                  setError("User document not found.");
              }
          }
      } catch (error) {
          const errorMessage = error.message;
          setError(errorMessage); // Set the error message in state
          console.error("Error during login: ", error);
      } finally {
          setLoading(false); // Reset loading state
      }
  };


  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div className="max-w-md w-full bg-white p-4 rounded-3xl shadow">
        <img src={logo} alt={<h2>MVINET</h2>}></img>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              
              type="password"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-1 text-right">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-5 text-center">
        <a href="/signUp" className="text-sm text-blue-500 hover:underline">
            Create An Account
          </a>
          </div>
      </div>
    </div>
    </>
  );
};

export default Login;
