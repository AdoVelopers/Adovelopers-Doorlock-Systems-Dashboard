import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import './../styles/Dashboard.css';
import User from '.././assets/user.png';
import Approvaldash from "../assets/approvaldash.png";
import Swal from 'sweetalert2';

function Dashboard() {
    const location = useLocation();
    const { success } = location.state || {};

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalItems = 78;

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome to your Dashboard!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }
    }, [success]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

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

                <div className="pagination-container">
                    <div className="pagination-info">
                        {`Showing ${startIndex}-${endIndex} of ${totalItems}`}
                    </div>
                    <div className="pagination-arrows">
                        <button
                            className="pagination-arrow"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            &#8592; 
                        </button>
                        <button
                            className="pagination-arrow"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            &#8594; 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
