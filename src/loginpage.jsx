// src/Login.js
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './component/firebase'
import { AuthContext } from './component/authContext';
const Login = () => {
  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const handlelogin = (e) =>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    dispatch({type: "LOGIN",payload : user})
    console.log(user)
    navigate('/tbi-admin')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    setError(errorMessage)
  });
  }

  return (
    <>

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow">
        <img src={logo} alt={<h2>MVINET</h2>}></img>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handlelogin}>
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
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
