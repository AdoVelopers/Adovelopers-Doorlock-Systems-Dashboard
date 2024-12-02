import React, { useState } from 'react';
import './../styles/Notifications.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import Swal from 'sweetalert2';

function Notifications() {
    const [notificationsData, setNotificationsData] = useState([
        { id: 1, notificationId: 'N101', userId: 'U101', name: 'John Doe', time: '10:30 AM', date: '2024-11-28', type: 'Alert' },
        { id: 2, notificationId: 'N102', userId: 'U102', name: 'Jane Smith', time: '11:00 AM', date: '2024-11-29', type: 'Reminder' },
        { id: 3, notificationId: 'N103', userId: 'U103', name: 'Alice Brown', time: '12:15 PM', date: '2024-11-30', type: 'Update' },
        { id: 4, notificationId: 'N104', userId: 'U104', name: 'Bob Green', time: '01:45 PM', date: '2024-12-01', type: 'Warning' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [editForm, setEditForm] = useState({});
    const itemsPerPage = 3;

    const totalPages = Math.ceil(notificationsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = notificationsData.slice(startIndex, startIndex + itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const openEditDialog = (notification) => {
        setSelectedNotification(notification);
        setEditForm(notification);
        setShowEditDialog(true);
    };

    const closeDialog = () => {
        setShowEditDialog(false);
        setSelectedNotification(null);
    };

    const deleteNotification = (notification) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setNotificationsData((prevData) =>
                    prevData.filter((item) => item.id !== notification.id)
                );
                Swal.fire('Deleted!', 'Notification has been deleted.', 'success');
            }
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const saveEdit = () => {
        setNotificationsData((prevData) =>
            prevData.map((item) =>
                item.id === editForm.id ? { ...item, ...editForm } : item
            )
        );
        Swal.fire('Success', 'Notification updated successfully!', 'success');
        closeDialog();
    };

    return (
        <div className="notifications-container">
            <Sidebar />
            <div className="notifications-content">
                <h1>Notifications</h1>
                <div className="table-wrapper">
                    <table className="notifications-table">
                        <thead>
                            <tr>
                                <th>NOTIFICATION ID</th>
                                <th>USER ID</th>
                                <th>NAME</th>
                                <th>TIME</th>
                                <th>DATE</th>
                                <th>TYPE</th>
                                <th>MANAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((notification) => (
                                <tr key={notification.id}>
                                    <td>{notification.notificationId}</td>
                                    <td>{notification.userId}</td>
                                    <td>{notification.name}</td>
                                    <td>{notification.time}</td>
                                    <td>{notification.date}</td>
                                    <td>{notification.type}</td>
                                    <td>
                                        <button className="editbtn" onClick={() => openEditDialog(notification)}>
                                            <img src={Edit} alt="Edit" />
                                        </button>
                                        <button
                                            className="deletebtn"
                                            onClick={() => deleteNotification(notification)}
                                        >
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
                        {`Showing ${startIndex + 1}-${Math.min(
                            startIndex + itemsPerPage,
                            notificationsData.length
                        )} of ${notificationsData.length}`}
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

            {showEditDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h3>Edit Notification</h3>
                        <form>
                            <label>
                                Notification ID:
                                <input
                                    type="text"
                                    name="notificationId"
                                    value={editForm.notificationId}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                User ID:
                                <input
                                    type="text"
                                    name="userId"
                                    value={editForm.userId}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Time:
                                <input
                                    type="text"
                                    name="time"
                                    value={editForm.time}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    name="date"
                                    value={editForm.date}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Type:
                                <input
                                    type="text"
                                    name="type"
                                    value={editForm.type}
                                    onChange={handleEditChange}
                                />
                            </label>
                        </form>
                        <div className="dialog-actions">
                            <button onClick={saveEdit}>Save</button>
                            <button onClick={closeDialog}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Notifications;
