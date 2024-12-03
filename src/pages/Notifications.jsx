import React, { useState } from 'react';
import './../styles/Notifications.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import Swal from 'sweetalert2';

function Notifications() {
    const [notificationsData, setNotificationsData] = useState([
        { id: 1, notificationId: 'N101', userId: 'U101', name: 'John Doe', time: '10:30 AM', date: '2024-11-28', type: 'Alert' },
        { id: 2, notificationId: 'N102', userId: 'U102', name: 'Jane Smith', time: '11:00 AM', date: '2024-11-29', type: 'Reminder' },
        { id: 3, notificationId: 'N103', userId: 'U103', name: 'Alice Brown', time: '12:15 PM', date: '2024-11-30', type: 'Update' },
        { id: 4, notificationId: 'N104', userId: 'U104', name: 'Bob Green', time: '01:45 PM', date: '2024-12-01', type: 'Warning' },
    ]);

    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [editForm, setEditForm] = useState({});

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
            <div className="notifications-content centered-content">
                <h1>Notifications</h1>
                <div className="notifications-row">
                    {notificationsData.map((notification) => (
                        <div key={notification.id} className="notification-card">
                            <div className="notification-info">
                                <h3>{notification.type}</h3>
                                <p><strong>ID:</strong> {notification.notificationId}</p>
                                <p><strong>User:</strong> {notification.name}</p>
                                <p><strong>Time:</strong> {notification.time}</p>
                                <p><strong>Date:</strong> {notification.date}</p>
                            </div>
                            <div className="notification-actions">
                                <button className="editbtn" onClick={() => openEditDialog(notification)}>
                                    <img src={Edit} alt="Edit" />
                                </button>
                                <button
                                    className="deletebtn"
                                    onClick={() => deleteNotification(notification)}
                                >
                                    <img src={Delete} alt="Delete" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showEditDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h3>Edit Notification</h3>
                        <form className="edit-form">
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
