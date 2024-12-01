import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Header.css';
import Image from '../assets/karl-bilog.png';
import { IoIosArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const toggleDropdown = () => setShowDropdown(prevState => !prevState);

    useEffect(() => {
        if (showDropdown) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showDropdown]);

    useEffect(() => {
        axios.get('/api/user-profile', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('loginSuccess');
                sessionStorage.clear();
                navigate("/", { state: { message: "You have successfully logged out." } }); // Pass message to login page
            }
        });
    };

    const closeDropdown = () => setShowDropdown(false);

    return (
        <div className="global-header">
            <div className="header-content">
                <div className="header-text"></div>
                <div className="header-profile">
                    <div className="image-container">
                        <img
                            src={Image}
                            alt="User Profile"
                        />
                    </div>
                    <div className="name-container">
                        <p className="user-name">Karl</p>
                        <p className="">Admin</p>
                        {user && (
                            <p className="user-role">{user.role}</p>
                        )}
                    </div>
                    <div className="dropdown-container">
                        <button
                            className={`dropdown-toggle ${showDropdown ? 'open' : ''}`}
                            onClick={toggleDropdown}
                            aria-haspopup="true"
                            aria-expanded={showDropdown ? "true" : "false"}
                        >
                            <IoIosArrowDropdown />
                        </button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <Link 
                                    to="/editprofile" 
                                    className="dropdown-item" 
                                    onClick={closeDropdown}
                                >
                                    Edit Profile
                                </Link>
                                <Link 
                                    to="/settings" 
                                    className="dropdown-item" 
                                    onClick={closeDropdown}
                                >
                                    Settings
                                </Link>
                                <button
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
