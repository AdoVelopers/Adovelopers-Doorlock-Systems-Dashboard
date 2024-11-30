import React, { useState } from 'react';
import './../styles/Timelogs.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";

function Timelogs() {
    const [timelogsData, setTimelogsData] = useState([
        { id: 1, date: '2024-11-01', employee: 'John Doe', hours: 8, task: 'Development', status: 'Completed', remarks: '', type: 'Sample' },
        { id: 2, date: '2024-11-02', employee: 'Jane Smith', hours: 7, task: 'Testing', status: 'In Progress', remarks: '', type: 'Time In/Out' },
    ]);

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
                        {timelogsData.map((log) => (
                            <tr key={log.id}>
                                <td>{log.date}</td>
                                <td>{log.employee}</td>
                                <td>{log.hours}</td>
                                <td>{log.task}</td>
                                <td>{log.status}</td>
                                <td className={log.type === 'Sample' ? 'green' : 'red'}>{log.type}</td>
                                <td>
                                    <button className='editbtn'><img src={Edit} alt="" /></button>
                                    <button className='deletebtn'><img src={Delete} alt="" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Timelogs;
