import React, { useState } from 'react';
import './../styles/Timelogs.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";

function Timelogs() {
    const [timelogsData, setTimelogsData] = useState([
        { id: 1, date: '2024-11-01', employee: 'John Doe', hours: 8, task: 'Development', status: 'Completed', remarks: '', type: 'Sample' },
        { id: 2, date: '2024-11-02', employee: 'Jane Smith', hours: 7, task: 'Testing', status: 'In Progress', remarks: '', type: 'Time In/Out' },
        { id: 3, date: '2024-11-03', employee: 'Sam Wilson', hours: 6, task: 'Deployment', status: 'Completed', remarks: '', type: 'Time In/Out' },
        { id: 4, date: '2024-11-04', employee: 'Tony Stark', hours: 8, task: 'Designing', status: 'Completed', remarks: '', type: 'Sample' },
        { id: 5, date: '2024-11-05', employee: 'Steve Rogers', hours: 9, task: 'Research', status: 'In Progress', remarks: '', type: 'Sample' },
        { id: 6, date: '2024-11-06', employee: 'Bruce Banner', hours: 8, task: 'Development', status: 'Completed', remarks: '', type: 'Time In/Out' },
        { id: 7, date: '2024-11-07', employee: 'Natasha Romanoff', hours: 8, task: 'Security', status: 'Completed', remarks: '', type: 'Sample' },
        { id: 8, date: '2024-11-08', employee: 'Clint Barton', hours: 7, task: 'Testing', status: 'In Progress', remarks: '', type: 'Time In/Out' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(timelogsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = timelogsData.slice(startIndex, startIndex + itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="timelogs-container">
            <Sidebar />
            <h1>Timelogs</h1>
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
                                <td>{log.date}</td>
                                <td>{log.employee}</td>
                                <td>{log.hours}</td>
                                <td>{log.task}</td>
                                <td className={log.type === 'Sample' ? 'green' : 'red'}>{log.type}</td>
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
                    {`Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, timelogsData.length)} of ${timelogsData.length}`}
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
        </div>
    );
}

export default Timelogs;
