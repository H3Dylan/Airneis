import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import PrivateRoute from "../routes/PrivateRoute";

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        // history.push("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative cursor-pointer z-10" ref={dropdownRef}>
            <HiOutlineUserCircle onClick={handleToggle} size={30} />
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Mon profil</Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Paramètres</Link>
                    {!isLoggedIn && (
                        <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Se connecter</Link>
                    )}
                    {isLoggedIn && (
                        <Link
                            onClick={handleLogout}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full">
                            Se déconnecter
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;