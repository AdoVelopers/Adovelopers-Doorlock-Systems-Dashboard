import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../styles/Admin.css';
import Sidebar from "../../components/Sidebar";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";

function Admin() {
    const [usersData, setUsersData] = useState([
        { id: 1, userId: 'U001', name: 'John Doe', email: 'john.doe@example.com', dateRegistered: '2024-01-01', role: 'Admin', status: 'Active', policy: 'None' },
        { id: 2, userId: 'U002', name: 'Jane Smith', email: 'jane.smith@example.com', dateRegistered: '2024-02-15', role: 'User', status: 'Inactive', policy: 'Restricted' },
        { id: 3, userId: 'U003', name: 'Alice Johnson', email: 'alice.johnson@example.com', dateRegistered: '2024-03-10', role: 'User', status: 'Active', policy: 'None' },
        { id: 4, userId: 'U004', name: 'Bob Brown', email: 'bob.brown@example.com', dateRegistered: '2024-04-20', role: 'User', status: 'Inactive', policy: 'Restricted' },
        { id: 5, userId: 'U005', name: 'Charlie Davis', email: 'charlie.davis@example.com', dateRegistered: '2024-05-05', role: 'Admin', status: 'Active', policy: 'None' },
        { id: 6, userId: 'U006', name: 'Dana Lee', email: 'dana.lee@example.com', dateRegistered: '2024-06-01', role: 'User', status: 'Active', policy: 'Restricted' },
        { id: 7, userId: 'U007', name: 'Eve Martinez', email: 'eve.martinez@example.com', dateRegistered: '2024-07-15', role: 'User', status: 'Inactive', policy: 'None' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userPolicy, setUserPolicy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(usersData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = usersData.slice(startIndex, startIndex + itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setUserPolicy(user.policy);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setUserPolicy('');
    };

    const handlePolicyChange = (e) => {
        setUserPolicy(e.target.value);
    };

    const handleSave = () => {
        const updatedUsers = usersData.map((user) =>
            user.id === selectedUser.id
                ? { ...user, policy: userPolicy }
                : user
        );
        setUsersData(updatedUsers);
        closeModal();
    };

    return (
        <div className="admin-container">
            <Sidebar />
            <h1>Admin List</h1>
            <div className="table-wrapper">
                <table className="admin-table">
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
                                <td>{user.status}</td>
                                <td>
                                    <button className="editbtn" onClick={() => handleEditClick(user)}>
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

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="policy">
                            <Form.Label>User Policy</Form.Label>
                            <Form.Control
                                as="select"
                                value={userPolicy}
                                onChange={handlePolicyChange}
                            >
                                <option value="None">None</option>
                                <option value="Restricted">Restricted</option>
                                <option value="Active">Active</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Admin;
