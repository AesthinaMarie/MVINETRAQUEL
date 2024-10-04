
import {Menu,X} from "lucide-react";
import { useState } from "react";
import React from 'react';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    const navigate = useNavigate();
    const [mobileDrawerOpen,setMobileDrawerOpen] = useState(false);
    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    const navItems = [
        {label: "MVINET",href :"#"},
        {label: "Startups",href :"#"},
        {label: "Events",href :"#"},
    ];


    const handleLogin = () =>{
        navigate('/login');
    }


  return (
    <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80'>
        <div className="container px-4 mx-auto relative text-sm">
            <div className='flex justify-between items-center'>
                <div className='flex items-center flex-shrink-0'>
                    <a href='#'><img  className="h-12 w-auto mr-2"src={Logo}alt=''></img></a>
                </div>
                <ul className='hidden lg:flex ml-14 space-x-12'>
                    {navItems.map((item,index) => (
                        <li key={index} className="font-semibold">
                            <a href={item.href}>{item.label}</a>
                        </li>))
                    }
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-5 items-center">
                        <a href="/login" className='py-2 px-3 border rounded-md'>
                            Login
                        </a>
                        <a href="#" className='bg-gradient-to-r from-blue-500 to-blue-800 text-white py-2 px-3 rounded-md'>
                            Register
                        </a>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>{mobileDrawerOpen ? <X/> : <Menu/>}</button>
                    </div>
            </div>
            {mobileDrawerOpen && (<div className="fixed right-0 z-20 bg-gradient-to-br from-blue-400 to-blue-700 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                <ul>
                    {navItems.map((item,index)=>(
                        <li key={index} className="py-4 text-white font-semibold">
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
                <div className="flex space-x-6">
                    <a href="/login" className="py-2 px-3 border rounded-md text-white">Sign In</a>
                    <a href="#" className='bg-gradient-to-r from-blue-500 to-blue-800 text-white py-2 px-3 rounded-md'>
                    Register</a>
                </div>

            </div>)}

        </div>
    </nav>
  )
}

export default Navbar