import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import './../styles/Dashboard.css';
import User from '.././assets/user.png';
import Approvaldash from "../assets/approvaldash.png";
import Swal from 'sweetalert2';
import axios from 'axios';

function Dashboard() {
    const location = useLocation();
    const { success } = location.state || {}; 

    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalProducts: 0,
        forApproval: 0,
    });

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome AdoVelopers',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }

        // Check if user role is admin or user, then refresh after login
        const user = JSON.parse(localStorage.getItem('user')); // Assuming the user is stored in localStorage
        if (user && (user.role === 'admin' || user.role === 'user')) {
            window.location.reload(); // Refresh the page for admin or user role
        }

        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://54.252.176.21:3030/dashboard');
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, [success]);

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
                            <h1>{dashboardData.totalUsers}</h1>
                        </div>
                        <img src={User} alt="User Icon" className="grid-image" />
                    </div>
                    <div className="grid-item">
                        <div className="text-container">
                            <p>For Approval</p>
                            <h1>{dashboardData.forApproval}</h1>
                        </div>
                        <img src={Approvaldash} alt="Approval Icon" className="grid-image" />
                    </div>
                    <div className="grid-item">
                        <div className="text-container">
                            <p>Active Users</p>
                            <h1>{dashboardData.activeUsers}</h1>
                        </div>
                        <img src={User} alt="Active Users Icon" className="grid-image" />
                    </div>
                    <div className="grid-item">
                        <div className="text-container">
                            <p>Total Products</p>
                            <h1>{dashboardData.totalProducts}</h1>
                        </div>
                        <img src={User} alt="Products Icon" className="grid-image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
