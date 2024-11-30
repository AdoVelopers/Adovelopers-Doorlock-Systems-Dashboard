import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Header.css';
import Image from '../assets/karl-bilog.png';
import { IoIosArrowDropdown } from "react-icons/io";
import EditProfile from "../pages/users/EditProfile";

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null); 

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

    return (
        <div className="global-header">
            <div className="header-content">
                <div className="header-text">
                  
                </div>
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
                                <a className="dropdown-item" href="/editprofile"> <Link to="/editprofile"></Link>Profile</a>
                                <a className="dropdown-item" href="/settings">Settings</a>
                                <a className="dropdown-item" href="/logout">Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
