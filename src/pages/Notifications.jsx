import React, { useState } from 'react';
import './../styles/Notifications.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

function Notifications() {
    const [notificationsData, setNotificationsData] = useState([
        { id: 1, notificationId: 'N101', userId: 'U101', name: 'John Doe', time: '10:30 AM', date: '2024-11-28', type: 'Alert' },
        { id: 2, notificationId: 'N102', userId: 'U102', name: 'Jane Smith', time: '11:00 AM', date: '2024-11-29', type: 'Reminder' },
        { id: 3, notificationId: 'N103', userId: 'U103', name: 'Alice Brown', time: '12:15 PM', date: '2024-11-30', type: 'Update' },
        { id: 4, notificationId: 'N104', userId: 'U104', name: 'Bob Green', time: '01:45 PM', date: '2024-12-01', type: 'Warning' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
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
        setShowEditDialog(true);
    };

    const openDeleteDialog = (notification) => {
        setSelectedNotification(notification);
        setShowDeleteDialog(true);
    };

    const closeDialog = () => {
        setShowEditDialog(false);
        setShowDeleteDialog(false);
        setSelectedNotification(null);
    };

    const deleteNotification = () => {
        setNotificationsData((prevData) =>
            prevData.filter((notification) => notification.id !== selectedNotification.id)
        );
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
                                        <button className="deletebtn" onClick={() => openDeleteDialog(notification)}>
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

            {/* Delete Dialog */}
            {showDeleteDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this notification?</p>
                        <div className="dialog-actions">
                            <button onClick={deleteNotification}>Yes</button>
                            <button onClick={closeDialog}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Dialog */}
            {showEditDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h3>Edit Notification</h3>
                        <p>Edit details for {selectedNotification?.name}</p>
                        {/* Add your edit form here */}
                        <div className="dialog-actions">
                            <button onClick={closeDialog}>Save</button>
                            <button onClick={closeDialog}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notifications;
