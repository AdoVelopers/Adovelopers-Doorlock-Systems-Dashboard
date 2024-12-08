import React, { useState, useEffect } from 'react';
import '../../styles/User.css';
import Sidebar from "../../components/Sidebar";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import axios from 'axios';

function Users() {
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        // Fetching users for approval from the backend API
        const fetchForApproval = async () => {
            try {
                const response = await axios.get('http://54.252.176.21:3030/api/users/clients');

                // Filter out users where 'approved' is false and sort by 'date'
                const filteredAndSortedUsers = response.data
                    .filter(user => user.approved === true)  // Filter users with 'approved' = true
                    .sort((a, b) => new Date(b.date) - new Date(a.date));  // Sort by 'date' in descending order

                setUsersData(filteredAndSortedUsers);  // Set the filtered and sorted users data
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchForApproval();
    }, []);

    const totalPages = Math.ceil(usersData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = usersData.slice(startIndex, startIndex + itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="users-container">
            <Sidebar />
            <div className="users-content">
                <h1>Client List</h1>
                <div className="table-wrapper">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>USER ID</th>
                                <th>NAME</th>
                                <th>DATE REGISTERED</th>
                                <th>ROLE</th>
                                <th>STATUS</th>
                                <th>MANAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.user_id}</td>
                                    <td>{user.full_name}</td>
                                    <td>{new Date(user.date).toLocaleDateString()}</td>
                                    <td>{user.role}</td>
                                    <td className={user.active === 'Active' ? 'status-active' : 'status-inactive'}>
                                        {user.active}
                                    </td>
                                    <td>
                                        <button className="editbtn">
                                            <img src={Edit} alt="Edit" />
                                        </button>
                                        <button className="deletebtn">
                                            <img src={Delete} alt="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination-container">
                    <div className="pagination-info">
                        {`Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, usersData.length)} of ${usersData.length}`}
                    </div>
                    <div className="pagination-arrows">
                        <button
                            className="pagination-arrow"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            <MdKeyboardArrowLeft size={'20px'} />
                        </button>
                        <button
                            className="pagination-arrow"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <MdKeyboardArrowRight size={'20px'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
