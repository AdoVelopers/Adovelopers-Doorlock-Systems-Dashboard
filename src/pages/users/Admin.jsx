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
    ]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userPolicy, setUserPolicy] = useState('');

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
                        {usersData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.dateRegistered}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td>
                                    <button className='editbtn' onClick={() => handleEditClick(user)}>
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

            <div className="restricted-access">
                <h2>Restricted Modules</h2>
                {usersData.map(user => (
                    <div key={user.id}>
                        {user.policy === 'Restricted' ? (
                            <p>Access Denied to {user.name}</p>
                        ) : (
                            <p>Access Granted to {user.name}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;
