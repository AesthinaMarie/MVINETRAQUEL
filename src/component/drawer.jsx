import React from 'react';
import { Link } from 'react-router-dom';

const Drawer = ({ isOpen, onToggle }) => {
    return (
        <div className={`fixed lg:relative lg:w-64 bg-white border-r border-neutral-200 h-screen lg:h-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="p-4">
                {/* Mobile Toggle Button */}
                <div className="lg:hidden p-4">
                    <button onClick={onToggle} className="flex items-center space-x-2">
                        {isOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>

                <h2 className="text-xl font-bold mb-4">SuperAdmin</h2>
                    {/* Other Options Section */}
                    <div>
                    <h3 className="font-semibold text-lg mb-2">Main</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/startups" className="block py-2 px-3 rounded hover:bg-neutral-100">Startups</Link>
                        </li>
                        <li>
                            <Link to="/events" className="block py-2 px-3 rounded hover:bg-neutral-100">Events</Link>
                        </li>
                    </ul>
                </div>
                {/* Users Section */}
                <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Users</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/tbi-admin" className="block py-2 px-3 rounded hover:bg-neutral-100">TBI Admin</Link>
                        </li>
                        <li>
                            <Link to="/incubee" className="block py-2 px-3 rounded hover:bg-neutral-100">Incubee</Link>
                        </li>
                        <li>
                            <Link to="/investor" className="block py-2 px-3 rounded hover:bg-neutral-100">Investor</Link>
                        </li>
                    </ul>
                </div>

            
            </div>
        </div>
    );
}

export default Drawer;
