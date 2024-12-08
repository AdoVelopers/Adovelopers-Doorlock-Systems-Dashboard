import React, { useState, useEffect } from 'react';
import './../styles/Timelogs.css';
import Sidebar from "../components/Sidebar";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import axios from 'axios';  // Import axios

function Timelogs() {
    const [timelogsData, setTimelogsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTimelog, setEditingTimelog] = useState(null);

    const [filters, setFilters] = useState({
        userId: '',
        name: '',
        date: '',
        time: '',
        type: ''
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const resetFilters = () => {
        setFilters({
            userId: '',
            name: '',
            date: '',
            time: '',
            type: ''
        });
    };

    // Fetch timelogs data from backend API
    useEffect(() => {
        const fetchTimelogs = async () => {
            try {
                const response = await axios.get('http://54.252.176.21:3030/api/timelogs');

                // Sort the timelogs data by date in descending order
                const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

                setTimelogsData(sortedData);
            } catch (error) {
                console.error('Error fetching timelogs:', error);
            }
        };

        fetchTimelogs();
    }, []);

    const filterTimelogs = () => {
        return timelogsData.filter(log => {
            let isValid = true;

            // Filter by userId
            if (filters.userId && !log.user_id.includes(filters.userId)) {
                isValid = false;
            }

            // Filter by name
            if (filters.name && !log.full_name.toLowerCase().includes(filters.name.toLowerCase())) {
                isValid = false;
            }

            // Filter by date
            if (filters.date && new Date(log.date).toLocaleDateString() !== new Date(filters.date).toLocaleDateString()) {
                isValid = false;
            }

            // Filter by time (convert to 24-hour format)
            if (filters.time && log.time) {
                const selectedTime = filters.time;
                const logTime = convertTo24Hour(log.time);
                if (logTime !== selectedTime) {
                    isValid = false;
                }
            }

            // Filter by type
            if (filters.type && log.type !== filters.type) {
                isValid = false;
            }

            return isValid;
        });
    };

    const convertTo24Hour = (time12hr) => {
        let [time, modifier] = time12hr.split(' ');
        let [hours, minutes] = time.split(':');

        if (modifier === 'PM' && hours !== '12') {
            hours = (parseInt(hours) + 12).toString();
        }
        if (modifier === 'AM' && hours === '12') {
            hours = '00';
        }

        return `${hours}:${minutes}`;
    };

    const convertTo12HourFormat = (time24hr) => {
        if (!time24hr) {
            // Return a default value or empty string if the time is missing
            console.error("Invalid time value:", time24hr);
            return "Invalid time";
        }

        let [hours, minutes] = time24hr.split(':');
        if (!hours || !minutes) {
            // If the split operation fails, return a default value
            console.error("Invalid time format:", time24hr);
            return "Invalid time format";
        }

        let period = "AM";

        if (parseInt(hours) >= 12) {
            period = "PM";
            if (parseInt(hours) > 12) {
                hours -= 12;
            }
        }
        if (parseInt(hours) === 0) {
            hours = 12;
        }

        return `${hours}:${minutes}`;
    };

    const filteredData = filterTimelogs();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="timelogs-container">
            <Sidebar />
            <p>Timelogs</p>
            <div className="filters-container">
                <div className="filter-item">
                    <label>User ID</label>
                    <input
                        type="text"
                        name="userId"
                        value={filters.userId}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-item">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-item">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-item">
                    <label>Time</label>
                    <input
                        type="time"
                        name="time"
                        value={filters.time}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-item">
                    <label>Type</label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        <option value="LOG IN">LOG IN</option>
                        <option value="LOG OUT">LOG OUT</option>
                    </select>
                </div>

                {/* Reset Button */}
                <div className="reset-button-container">
                    <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="timelogs-table">
                    <thead>
                        <tr>
                            <th>TIMELOG ID</th>
                            <th>USER ID</th>
                            <th>NAME</th>
                            <th>TIME LOGGED</th>
                            <th>DATE LOGGED</th>
                            <th>TYPE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((log) => (
                            <tr key={log.timelog_id}>
                                <td>{log.timelog_id}</td>
                                <td>{log.user_id}</td>
                                <td>{log.full_name}</td>
                                <td>
                                    {
                                        // Check if log.time exists. If not, use log.date to extract the time.
                                        convertTo12HourFormat(log.time || new Date(log.date).toISOString().substring(11, 16))
                                    }
                                </td> {/* Convert time to 12-hour format */}
                                <td>{new Date(log.date).toLocaleDateString()}</td>
                                <td className={log.type === 'LOG IN' ? 'green' : 'red'}>{log.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container">
                <div className="pagination-info">
                    {`Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredData.length)} of ${filteredData.length}`}
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
