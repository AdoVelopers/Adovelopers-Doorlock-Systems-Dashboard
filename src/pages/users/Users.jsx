import React, { useState } from 'react';
import '../../styles/User.css';
import Sidebar from "../../components/Sidebar";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

function Users() {
    const [usersData, setUsersData] = useState([
        { id: 1, userId: 'U101', name: 'TEST', email: 'TEST@example.com', dateRegistered: '2024-03-12', role: 'User', status: 'Active' },
        { id: 2, userId: 'U102', name: 'TEST', email: 'TEST@example.com', dateRegistered: '2024-04-08', role: 'Moderator', status: 'Inactive' },
        { id: 3, userId: 'U103', name: 'TEST', email: 'TEST@example.com', dateRegistered: '2024-05-19', role: 'Admin', status: 'Active' },
        { id: 4, userId: 'U104', name: 'TEST', email: 'TEST@example.com', dateRegistered: '2024-06-10', role: 'User', status: 'Inactive' },
        { id: 5, userId: 'U105', name: 'TEST', email: 'TEST@example.com', dateRegistered: '2024-07-21', role: 'Moderator', status: 'Active' },
        { id: 6, userId: 'U106', name: 'TEST', email: 'TEST@example.com', dateRegistered: '2024-08-01', role: 'Admin', status: 'Active' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

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
                <h1>User List</h1>
                <div className="table-wrapper">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>USER ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>DATE REGISTERED</th>
                                <th>ROLE</th>
                                <th>STATUS</th>
                                <th>MANAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.userId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dateRegistered}</td>
                                    <td>{user.role}</td>
                                    <td className={user.status === 'Active' ? 'status-active' : 'status-inactive'}>
                                        {user.status}
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
