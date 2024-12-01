import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from "../../components/Sidebar";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import '../../styles/Admin.css';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Swal from 'sweetalert2';

function Admin() {
    const [usersData, setUsersData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userPolicy, setUserPolicy] = useState({});
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

    const defaultPolicy = {
        Dashboard: { view: false, add: false, delete: false },
        Inventory: { view: false, add: false, delete: false },
        Timelogs: { view: false, add: false, delete: false },
        Approval: { view: false, add: false, delete: false },
        Users: { view: false, add: false, delete: false }
    };

    const handleEditClick = (user) => {
        const userPolicy = user.policy || defaultPolicy;
        setSelectedUser(user);
        setUserPolicy(userPolicy);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handlePolicyChange = (e) => {
        const { name, value, checked } = e.target;
        setUserPolicy(prevPolicy => ({
            ...prevPolicy,
            [name]: {
                ...prevPolicy[name],
                [value]: checked
            }
        }));
    };

    const handleSave = () => {
    
        const updatedUsers = usersData.map((user) =>
            user.id === selectedUser.id
                ? { ...user, policy: userPolicy }
                : user
        );

        setUsersData(updatedUsers);  

    
        localStorage.setItem('users', JSON.stringify(updatedUsers));

     
        Swal.fire({
            title: 'Success!',
            text: 'User policy updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        closeModal();
    };

    const handleDelete = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the user.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedUsers = usersData.filter(user => user.id !== userId);
                setUsersData(updatedUsers);
                localStorage.setItem('users', JSON.stringify(updatedUsers));

                Swal.fire({
                    title: 'Deleted!',
                    text: 'User has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    const addUser = (newUser) => {
        setUsersData(prevData => {
            const updatedData = [...prevData, newUser];
            localStorage.setItem('users', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsersData(storedUsers);
    }, []);

    return (
        <div className="admin-container">
            <Sidebar userPolicy={userPolicy} />
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
                                    <button className="deletebtn" onClick={() => handleDelete(user.id)}>
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
                    <button className="pagination-arrow" onClick={goToPreviousPage} disabled={currentPage === 1}>
                        <MdKeyboardArrowLeft size={'20px'} />
                    </button>
                    <button className="pagination-arrow" onClick={goToNextPage} disabled={currentPage === totalPages}>
                        <MdKeyboardArrowRight size={'20px'} />
                    </button>
                </div>
            </div>

            <Modal show={showModal} onHide={closeModal} className="admin-modal-container">
                <Modal.Header closeButton className="admin-modal-header">
                    <Modal.Title>Edit User Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body className="admin-modal-body">
                    <Form>
                        {['Dashboard', 'Inventory', 'Timelogs', 'Approval', 'Users'].map((module) => (
                            <div className="module-container" key={module}>
                                <div className="module-name">{module}</div>
                                <div className="checkbox-container">
                                    <div className="checkbox-item">
                                        <Form.Check
                                            type="checkbox"
                                            label="View"
                                            name={module}
                                            value="view"
                                            checked={userPolicy[module]?.view || false}
                                            onChange={handlePolicyChange}
                                        />
                                    </div>
                                    <div className="checkbox-item">
                                        <Form.Check
                                            type="checkbox"
                                            label="Add"
                                            name={module}
                                            value="add"
                                            checked={userPolicy[module]?.add || false}
                                            onChange={handlePolicyChange}
                                        />
                                    </div>
                                    <div className="checkbox-item">
                                        <Form.Check
                                            type="checkbox"
                                            label="Delete"
                                            name={module}
                                            value="delete"
                                            checked={userPolicy[module]?.delete || false}
                                            onChange={handlePolicyChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer className="admin-modal-footer">
                    <Button variant="secondary" onClick={closeModal} className="admin-modal-btn-secondary">Cancel</Button>
                    <Button variant="primary" onClick={handleSave} className="admin-modal-btn-primary">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Admin
