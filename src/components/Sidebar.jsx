import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Inventory from '../assets/inventory.png';
import NotificationsIcon from '../assets/approval.png';
import Timelogs from '../assets/timelogs.png';
import Users from '../assets/users.png';
import { CiPower } from "react-icons/ci";
import Dashboard from '../assets/dashboard.png';
import UserContext from '../protectedRoutes/UserContext';

function Sidebar() {
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const { user } = useContext(UserContext);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const handleUsersClick = () => {
        setIsUsersOpen(!isUsersOpen);
    };

    const isActive = (path) => activeLink === path;

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="logo-container">
                    <div className="blue-text"><h1>Ado</h1></div><div><h1>Velopers</h1></div>
                </div>

                <ul>
                    <li className={isActive('/dashboard') ? 'active' : ''}>
                        <Link to="/dashboard">
                            <img src={Dashboard} alt="" /> Dashboard
                        </Link>
                    </li>
                    <li className={isActive('/inventory') ? 'active' : ''}>
                        <Link to="/inventory">
                            <img src={Inventory} alt="" /> Inventory
                        </Link>
                    </li>
                    {user && user.role === 'superadmin' && (
                        <li className={isActive('/timelogs') ? 'active' : ''}>
                            <Link to="/timelogs">
                                <img src={Timelogs} alt="" /> Timelogs
                            </Link>
                        </li>
                    )}
                    {user && user.role === 'superadmin' && (
                        <li className={isActive('/notifications') ? 'active' : ''}>
                            <Link to="/notifications">
                                <img src={NotificationsIcon} alt="" /> Notifications
                            </Link>
                        </li>
                    )}
                    {user && user.role === 'superadmin' && (
                        <li
                            className={`${(isActive('/users') || isActive('/admin') || isActive('/regular-users') || isActive('/for-approval')) ? 'active' : ''}`}
                        >
                            <Link to="#" onClick={handleUsersClick} className="dropdown-trigger">
                                <img src={Users} alt="" /> Users{" "}
                                {isUsersOpen ? (
                                    <RiArrowDropUpLine className="dropdown-icon" />
                                ) : (
                                    <RiArrowDropDownLine className="dropdown-icon" />
                                )}
                            </Link>

                            <ul className="dropdown">
                                <li className={isActive('/admin') ? 'active' : ''}>
                                    <Link to="/admin" onClick={() => setActiveLink('/admin')}>Admin</Link>
                                </li>
                                <li className={isActive('/regular-users') ? 'active' : ''}>
                                    <Link to="/regular-users" onClick={() => setActiveLink('/regular-users')}>Users</Link>
                                </li>
                                <li className={isActive('/for-approval') ? 'active' : ''}>
                                    <Link to="/for-approval" onClick={() => setActiveLink('/for-approval')}>Pending</Link>
                                </li>
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
