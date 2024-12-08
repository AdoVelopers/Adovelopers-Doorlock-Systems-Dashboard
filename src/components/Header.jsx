import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import '../styles/Header.css';
import { IoIosArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThemeContext } from "../contexts/ThemeContext"; // Import ThemeContext

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null); // User data state
    const [profileImage, setProfileImage] = useState(null); // Profile image state
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Get the current theme

    const toggleDropdown = () => setShowDropdown((prevState) => !prevState);

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
        const userId = localStorage.getItem('user_id'); // Get the user ID from localStorage
        if (userId) {
            // Fetch user data using the user ID
            axios
                .get(`http://54.252.176.21:3030/api/users/${userId}`, { withCredentials: true })
                .then((response) => {
                    if (response.data && response.data.length > 0) {
                        const userData = response.data[0];
                        setUser(userData); // Set user data

                        // Check if profile image is available, and set it or use default
                        const imagePath = userData.profileImagePath
                            ? `http://54.252.176.21:3030${userData.profileImagePath}` // Assuming profile image path is saved correctly
                            : '/default-profile.png';
                        setProfileImage(imagePath); // Set profile image
                    } else {
                        console.error('User data not found');
                        setUser(null);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                });
        }
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
                // Clear localStorage, sessionStorage, and cookies (if applicable)
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                sessionStorage.clear();
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear the cookie

                navigate("/", { state: { message: "You have successfully logged out." } });
            }
        });
    };

    const closeDropdown = () => setShowDropdown(false);

    return (
        <div className={`global-header ${theme}`}> {/* Apply theme class to global-header */}
            <div className="header-content">
                <div className="header-text"></div>
                <div className="header-profile">
                    <div className="image-container">
                        <img
                            src={profileImage || '/default-profile.png'}
                            alt="User Profile"
                            onError={(e) => {
                                e.target.src = '/default-profile.png'; // Fallback if image fails to load
                            }}
                        />
                    </div>
                    <div className="name-container">
                        <p className="user-name">{user ? user.full_name : 'Loading...'}</p>
                        <p className="user-role">{user ? user.role : 'Loading role...'}</p>
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
                        {showDropdown && user && (
                            <div className="dropdown-menu">
                                <Link
                                    to="/editprofile"
                                    className="dropdown-item"
                                    onClick={closeDropdown}
                                >
                                    Edit Profile
                                </Link>

                                {/* Render Settings only for SUPERADMIN */}
                                {user.role && user.role.toUpperCase() === 'SUPERADMIN' && (
                                    <Link
                                        to="/settings"
                                        className="dropdown-item"
                                        onClick={closeDropdown}
                                    >
                                        Settings
                                    </Link>
                                )}

                                <Link
                                    to="/notifications"
                                    className="dropdown-item"
                                    onClick={closeDropdown}
                                >
                                    Notifications
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
