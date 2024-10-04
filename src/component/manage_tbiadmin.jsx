import React, { useState, useEffect } from 'react';
import { Edit, Plus, XCircle, School, Mail, Calendar, Delete } from 'lucide-react';
import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { db, auth } from "../component/firebase";

const universities = ['Mindoro State University(MinSu)', 'Marinduque State College(MSC)', 'Romblon State University(RSU)',"Palawan State University(PSU)","Western Philippine University(WPU)","Occidental Mindoro State","College()"];
const statuses = ['Active', 'Inactive'];

const TBIAdminContent = () => {
    const [universityFilter, setUniversityFilter] = useState('');
    const [dateRegisteredFilter, setDateRegisteredFilter] = useState('');
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        university: '',
        email: '',
        dateRegistered: '',
        status: '',
    });
    const [editUserId, setEditUserId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(userList);
            } catch (err) {
                console.error("Error fetching users: ", err);
            }
        };

        fetchUsers();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setError('');
        setFormData({ university: '', email: '', dateRegistered: '', status: '' });
        setEditUserId(null); // Reset edit user ID
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { university, email, dateRegistered, status } = formData;
        const userType = 2
        try {
            if (editUserId) {
                // Update existing user
                await setDoc(doc(db, "users", editUserId), {userType,university, email, dateRegistered, status });
                setUsers(users.map(user => (user.id === editUserId ? { ...user, university, email, dateRegistered, status } : user)));
            } else {
                // Create new user
                const userCredential = await createUserWithEmailAndPassword(auth, email, "Default@123");
                const user = userCredential.user;
               
                await setDoc(doc(db, "users", user.uid), {
                    userType,
                    university,
                    email,
                    dateRegistered,
                    status,
                    username: email.split('@')[0],
                });

                setUsers([...users, { id: user.uid, university, email, dateRegistered, status, username: email.split('@')[0] }]);
            }

            toggleModal(); // Close modal after submission
        } catch (err) {
            console.error("Error saving user: ", err);
            setError(err.message);
        }
    };

    const handleEditClick = (user) => {
        setEditUserId(user.id);
        setFormData({
            university: user.university,
            email: user.email,
            dateRegistered: user.dateRegistered,
            status: user.status,
        });
        toggleModal();
    };

    const handleDeleteClick = async (userId) => {
        try {
            await deleteDoc(doc(db, "users", userId));
        } catch (err) {
            console.error("Error deleting user: ", err);
            setError(err.message);
        }
    };

    const filteredUsers = users.filter(user => {
        return (
            (universityFilter ? user.university === universityFilter : true) &&
            (dateRegisteredFilter ? user.dateRegistered === dateRegisteredFilter : true)
        );
    });

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto mb-4 md:mb-0">
                    <label className="relative w-full md:w-1/3">
                        <span className="text-gray-700">University</span>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-2 pl-3 flex items-center pointer-events-none">
                                <School className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                className="border border-gray-300 rounded-md p-2 pl-10 w-full"
                                value={universityFilter}
                                onChange={e => setUniversityFilter(e.target.value)}
                            >
                                <option value="">Select University</option>
                                {universities.map((univ, index) => (
                                    <option key={index} value={univ}>{univ}</option>
                                ))}
                            </select>
                        </div>
                    </label>

                    <label className="relative w-full md:w-1/3">
                        <span className="text-gray-700">Date Registered</span>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="date"
                                className="border border-gray-300 rounded-md p-2 pl-10 w-full"
                                value={dateRegisteredFilter}
                                onChange={e => setDateRegisteredFilter(e.target.value)}
                            />
                        </div>
                    </label>
                </div>

                <button onClick={toggleModal} className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center space-x-2 w-full md:w-auto mt-2 md:mt-0">
                    <Plus className="h-5 w-5" />
                    <span>Add User</span>
                </button>
            </div>

            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-lg transition-shadow mx-2 md:mx-0">
                        <h3 className="font-semibold text-lg">{user.university}</h3>
                        <p className="text-sm text-neutral-600"><span className="font-medium">Email: </span>{user.email}</p>
                        <p className="text-sm text-neutral-600"><span className="font-medium">Username: </span>{user.username}</p>
                        <p className="text-sm text-neutral-600"><span className="font-medium">Date Registered: </span>{user.dateRegistered}</p>
                        <p className="text-sm text-neutral-600"><span className="font-medium">Status: </span>{user.status}</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => handleDeleteClick(user.id)} className="text-red-500 hover:underline flex items-center">
                                <Delete className="h-5 w-5 mr-1" />
                                Delete
                            </button>
                            <button onClick={() => handleEditClick(user)} className="text-blue-500 hover:underline flex items-center">
                                <Edit className="h-5 w-5 mr-1" />
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <XCircle className="h-6 w-6" />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">{editUserId ? 'Edit User' : 'Add New User'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label className="block mb-4">
                                <span className="text-gray-700">University</span>
                                <select
                                    name="university"
                                    value={formData.university}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                >
                                    <option value="">Select University</option>
                                    {universities.map((univ, index) => (
                                        <option key={index} value={univ}>{univ}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-4">
                                <span className="text-gray-700">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </label>

                            <label className="block mb-4">
                                <span className="text-gray-700">Date Registered</span>
                                <input
                                    type="date"
                                    name="dateRegistered"
                                    value={formData.dateRegistered}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                            </label>

                            <label className="block mb-4">
                                <span className="text-gray-700">Status</span>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    {statuses.map((status, index) => (
                                        <option key={index} value={status}>{status}</option>
                                    ))}
                                </select>
                            </label>

                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
                                {editUserId ? 'Update User' : 'Add User'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TBIAdminContent;
