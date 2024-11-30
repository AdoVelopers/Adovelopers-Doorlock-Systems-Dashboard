import React, { useState } from "react";
import '../styles/Header.css';
import Image from '../assets/karl-bilog.png';
import { Dropdown } from 'react-bootstrap'; 

function Header() {
    const [showDropdown, setShowDropdown] = useState(false); 

    const toggleDropdown = () => setShowDropdown(prevState => !prevState);

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
                        <p className="user-name">John Doe</p>
                        <p className="user-role">Admin</p>
                    </div>
                    <div className="dropdown-container">
                        <Dropdown show={showDropdown} onToggle={toggleDropdown} autoClose="outside">
                            <Dropdown.Toggle variant="link" id="dropdown-custom-components">
                                <i className="fas fa-caret-down" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
