// src/SignupForm.js
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkedAlt, FaCity, FaFileUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from './backend';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function SignupForm() {
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    province: '',
    city: '',
    password: '',
    confirmPassword: '',
    fileUpload: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData) newErrors.region = 'Region is required';
    if (!formData.province) newErrors.province = 'province is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    //if (formData.userType === 'investors' && !formData.fileUpload) newErrors.fileUpload = 'Please upload a valid ID';
    //if (formData.userType === 'incubatees' && !formData.fileUpload) newErrors.fileUpload = 'Please upload a proposal';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const user = await createUser(formData);
        toast.success('Registration successful!', {
          position: "top-right",
          autoClose: 3000,  // Automatically close after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect after a short delay to give user time to read the success message
        setTimeout(() => navigate('/login'), 3500);
      } catch (error) {
        toast.success('Registration Failed,Please Try Again!', {
          position: "top-right",
          autoClose: 3000,  // Automatically close after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <> <Navbar></Navbar>
    <div className="flex items-center justify-center min-h-screen bg-white-100 p-8" >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-center text-2xl font-semibold text-blue-600 mb-4">Sign Up</h2>
        <p className='text-center text-gray-600 mb-6'>It's quick and easy</p>
        <form onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div className="mb-4">
            <label className="block text-gray-700">Are you a Incubatee or Investor:</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
            >
              <option value="3">Incubatee</option>
              <option value="4">Investor</option>
            </select>
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaUser className="p-2 text-gray-500" />
              <input
                type="text"
                className="flex-1 p-2 border-none focus:outline-none"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>

          {/* Middle Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Middle Name</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaUser className="p-2 text-gray-500" />
              <input
                type="text"
                className="flex-1 p-2 border-none focus:outline-none"
                name="middleName"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaUser className="p-2 text-gray-500" />
              <input
                type="text"
                className="flex-1 p-2 border-none focus:outline-none"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaEnvelope className="p-2 text-gray-500" />
              <input
                type="email"
                className="flex-1 p-2 border-none focus:outline-none"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaPhone className="p-2 text-gray-500" />
              <input
                type="text"
                className="flex-1 p-2 border-none focus:outline-none"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
          </div>

          {/* Province */}
          <div className="mb-4">
            <label className="block text-gray-700">Province:</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
            >
              <option value="Oriental Mindoro">Oriental Mindoro</option>
              <option value="Occidental Mindoro">Occidental Mindoro</option>
              <option value="Romblon">Romblon</option>
              <option value="Palawan">Palawan</option>
            </select>
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaCity className="p-2 text-gray-500" />
              <input
                type="text"
                className="flex-1 p-2 border-none focus:outline-none"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaLock className="p-2 text-gray-500" />
              <input
                type="password"
                className="flex-1 p-2 border-none focus:outline-none"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaLock className="p-2 text-gray-500" />
              <input
                type="password"
                className="flex-1 p-2 border-none focus:outline-none"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-gray-700">Upload Document</label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaFileUpload className="p-2 text-gray-500" />
              <input
                type="file"
                className="flex-1 p-2 border-none focus:outline-none"
                name="fileUpload"
                onChange={handleInputChange}
              />
            </div>
            {errors.fileUpload && <p className="text-red-500">{errors.fileUpload}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <button className="text-blue-600 hover:underline" onClick={() => navigate('/login')}>Sign In</button>
        </p>
      </div>
    </div>
    </>
  );
}

export default SignupForm;
