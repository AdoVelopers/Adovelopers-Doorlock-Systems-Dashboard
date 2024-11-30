import React, { useState } from 'react';
import '../../styles/User.css';  
import Sidebar from "../../components/Sidebar";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";

function Users() {
    const [usersData, setUsersData] = useState([
        { id: 1, userId: 'U101', name: 'Alice Johnson', email: 'alice.johnson@example.com', dateRegistered: '2024-03-12', role: 'User', status: 'Active' },
        { id: 2, userId: 'U102', name: 'Bob Williams', email: 'bob.williams@example.com', dateRegistered: '2024-04-08', role: 'Moderator', status: 'Inactive' },
    ]);

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
                            {usersData.map((user) => (
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
                                        <button className='editbtn'>
                                            <img src={Edit} alt="Edit" />
                                        </button>
                                        <button className='deletebtn'>
                                            <img src={Delete} alt="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;
