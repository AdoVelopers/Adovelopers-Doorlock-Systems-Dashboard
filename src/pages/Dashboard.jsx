import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";  // Import useLocation hook
import Sidebar from "../components/Sidebar";
import './../styles/Dashboard.css';
import User from '.././assets/user.png';
import Approvaldash from "../assets/approvaldash.png";
import Swal from 'sweetalert2';

function Dashboard() {
    const location = useLocation();  // Get the location object
    const { success } = location.state || {};  // Destructure the success state

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome to your Dashboard!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }
    }, [success]);  // This will trigger when 'success' is available

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                </header>

                <div className="grid-container">
                    <div className="grid-item">
                        <div className="text-container">
                            <p>Total User</p>
                            <h1>40,689</h1>
                        </div>
                        <img src={User} alt="User Icon" className="grid-image" />
                    </div>
                    <div className="grid-item">
                        <div className="text-container">
                            <p>For Approval</p>
                            <h1>40,689</h1>
                        </div>
                        <img src={Approvaldash} alt="Approval Icon" className="grid-image" />
                    </div>
                    <div className="grid-item">
                        <div className="text-container">
                            <p>Total Products</p>
                            <h1>40,689</h1>
                        </div>
                        <img src={User} alt="Products Icon" className="grid-image" />
                    </div>
                    <div className="grid-item">
                        <div className="text-container">
                            <p>Active Users</p>
                            <h1>40,689</h1>
                        </div>
                        <img src={User} alt="Active Users Icon" className="grid-image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
