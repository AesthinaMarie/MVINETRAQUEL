import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Bell, MessageSquare, ChevronDown, Menu } from "lucide-react";

const SuperNavBar = ({ toggleDrawer }) => {
    const navigate = useNavigate();
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

    const toggleAccountDropdown = () => {
        setAccountDropdownOpen(!accountDropdownOpen);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        navigate('/login');
    };

    return (
        <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg'>
            <div className="container px-4 mx-auto relative text-sm">
                <div className='flex justify-between items-center'>

                    {/* Mobile Toggle Button */}
                    <button onClick={toggleDrawer} className="lg:hidden p-4">
                        <Menu className="h-5 w-5 text-neutral-700" />
                    </button>

                    {/* Right Side Icons and Dropdown */}
                    <div className="ml-auto flex space-x-6 items-center">
                        {/* Notifications Icon */}
                        <button className='p-2 rounded-full hover:bg-neutral-200'>
                            <Bell className='h-6 w-6 text-neutral-700' />
                        </button>

                        {/* Messages Icon */}
                        <button className='p-2 rounded-full hover:bg-neutral-200'>
                            <MessageSquare className='h-6 w-6 text-neutral-700' />
                        </button>

                        {/* Account Dropdown Menu */}
                        <div className="relative">
                            <button
                                className='flex items-center space-x-1 p-2 rounded-full hover:bg-neutral-200'
                                onClick={toggleAccountDropdown}
                            >
                                <UserCircle className='h-6 w-6 text-neutral-700' />
                                <ChevronDown className='h-4 w-4 text-neutral-700' />
                            </button>

                            {/* Dropdown Menu */}
                            {accountDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-lg py-2 z-20">
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default SuperNavBar;
