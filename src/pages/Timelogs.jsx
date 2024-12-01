import React, { useState } from 'react';
import './../styles/Timelogs.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import Swal from 'sweetalert2';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
function Timelogs() {
    const [timelogsData, setTimelogsData] = useState([
        { id: 1, date: '2024-11-01', employee: 'TEST', hours: 8, task: 'Development', status: 'Completed', remarks: '', type: 'Sample' },
        { id: 2, date: '2024-11-02', employee: 'TEST', hours: 7, task: 'Testing', status: 'In Progress', remarks: '', type: 'Time In/Out' },
        { id: 3, date: '2024-11-03', employee: 'TEST', hours: 6, task: 'Deployment', status: 'Completed', remarks: '', type: 'Time In/Out' },
        { id: 4, date: '2024-11-04', employee: 'TEST', hours: 8, task: 'Designing', status: 'Completed', remarks: '', type: 'Sample' },
        { id: 5, date: '2024-11-05', employee: 'TEST', hours: 9, task: 'Research', status: 'In Progress', remarks: '', type: 'Sample' },
        { id: 6, date: '2024-11-06', employee: 'TEST', hours: 8, task: 'Development', status: 'Completed', remarks: '', type: 'Time In/Out' },
        { id: 7, date: '2024-11-07', employee: 'TEST', hours: 8, task: 'Security', status: 'Completed', remarks: '', type: 'Sample' },
        { id: 8, date: '2024-11-08', employee: 'TEST', hours: 7, task: 'Testing', status: 'In Progress', remarks: '', type: 'Time In/Out' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTimelog, setEditingTimelog] = useState(null);

    const totalPages = Math.ceil(timelogsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = timelogsData.slice(startIndex, startIndex + itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const openEditModal = (log) => {
        setEditingTimelog(log);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTimelog(null);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setTimelogsData((prevData) =>
            prevData.map((log) =>
                log.id === editingTimelog.id ? editingTimelog : log
            )
        );
        closeModal();

        Swal.fire({
            title: 'Success!',
            text: 'Timelog has been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, this timelog cannot be recovered!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setTimelogsData((prevData) => prevData.filter(log => log.id !== id));
                Swal.fire('Deleted!', 'The timelog has been deleted.', 'success');
            }
        });
    };

    return (
        <div className="timelogs-container">
            <Sidebar />
            <p>Timelogs</p>
            <div className="table-wrapper">
                <table className="timelogs-table">
                    <thead>
                        <tr>
                            <th>TIMELOG ID</th>
                            <th>USER ID</th>
                            <th>NAME</th>
                            <th>TIME IN</th>
                            <th>DATE LOGGED</th>
                            <th>TYPE</th>
                            <th>MANAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((log) => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{log.task}</td>
                                <td>{log.employee}</td>
                                <td>{log.hours}</td>
                                <td>{log.date}</td>
                                <td className={log.type === 'Sample' ? 'green' : 'red'}>{log.type}</td>
                                <td>
                                    <button className="editbtn" onClick={() => openEditModal(log)}>
                                        <img src={Edit} alt="Edit" />
                                    </button>
                                    <button className="deletebtn" onClick={() => handleDelete(log.id)}>
                                        <img src={Delete} alt="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
    <div className="timelogs-modal-overlay">
        <div className="timelogs-modal-content">
            <h2>Edit Timelog</h2>
            <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                    <label htmlFor="employee">USER ID</label> 
                    <input
                        type="text"
                        id="employee"
                        value={editingTimelog.employee}
                        onChange={(e) => setEditingTimelog({ ...editingTimelog, employee: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeName">NAME</label> 
                    <input
                        type="text"
                        id="employeeName"
                        value={editingTimelog.employee}
                        onChange={(e) => setEditingTimelog({ ...editingTimelog, employee: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hours">TIME IN</label> 
                    <input
                        type="number"
                        id="hours"
                        value={editingTimelog.hours}
                        onChange={(e) => setEditingTimelog({ ...editingTimelog, hours: +e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">DATE LOGGED</label> 
                    <input
                        type="date"
                        id="date"
                        value={editingTimelog.date}
                        onChange={(e) => setEditingTimelog({ ...editingTimelog, date: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">TYPE</label> 
                    <select
                        id="type"
                        value={editingTimelog.type}
                        onChange={(e) => setEditingTimelog({ ...editingTimelog, type: e.target.value })}
                    >
                        <option value="Sample">Sample</option>
                        <option value="Time In/Out">Time In/Out</option>
                    </select>
                </div>
                <div className="timelogs-modal-footer">
                    <button type="button" onClick={closeModal}>Cancel</button>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
)}

<div className="pagination-container">
                <div className="pagination-info">
                    {`Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, timelogsData.length)} of ${timelogsData.length}`}
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
   
    );
}

export default Timelogs;
