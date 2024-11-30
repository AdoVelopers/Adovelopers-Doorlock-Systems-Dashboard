import React, { useState } from 'react';
import './../styles/Inventory.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";



function Inventory() {
    const [inventoryData, setInventoryData] = useState([
        { id: 1, itemName: 'Fingerprint Scanner', status: 'Available', quantity: 15, remarks: '2024-11-28', type: 'TIME IN' },
        { id: 2, itemName: 'Camera', status: 'Low Stock', quantity: 2, remarks: '2024-11-28', type: 'TIME OUT' },
        { id: 3, itemName: 'Keyboard', status: 'Available', quantity: 10, remarks: '2024-11-28', type: 'TIME IN' },
        { id: 4, itemName: 'Monitor', status: 'Available', quantity: 5, remarks: '2024-11-28', type: 'TIME OUT' },
        { id: 5, itemName: 'Mouse', status: 'Low Stock', quantity: 3, remarks: '2024-11-28', type: 'TIME IN' },
        { id: 6, itemName: 'Printer', status: 'Available', quantity: 7, remarks: '2024-11-28', type: 'TIME OUT' },
        { id: 7, itemName: 'Router', status: 'Available', quantity: 4, remarks: '2024-11-28', type: 'TIME IN' },
        { id: 8, itemName: 'Scanner', status: 'Available', quantity: 6, remarks: '2024-11-28', type: 'TIME OUT' },
        { id: 9, itemName: 'Webcam', status: 'Low Stock', quantity: 2, remarks: '2024-11-28', type: 'TIME IN' },
        { id: 10, itemName: 'Microphone', status: 'Available', quantity: 8, remarks: '2024-11-28', type: 'TIME OUT' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(inventoryData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = inventoryData.slice(startIndex, startIndex + itemsPerPage);

    const handleQuantityChange = (id, increment) => {
        setInventoryData((prevData) =>
            prevData.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + (increment ? 1 : item.quantity > 0 ? -1 : 0) }
                    : item
            )
        );
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="inventory-container">
            <Sidebar />
            <p>Inventory</p>
            <div className="table-wrapper">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>ITEM NO.</th>
                            <th>ITEM NAME</th>
                            <th>STATUS</th>
                            <th>QUANTITY</th>
                            <th>REMARKS</th>
                            <th>TYPE</th>
                            <th>MANAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.itemName}</td>
                                <td className={item.status === 'Available' ? 'green' : 'red'}>
                                    {item.status}
                                </td>
                                <td>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item.id, false)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-box">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item.id, true)}
                                    >
                                        +
                                    </button>
                                </td>
                                <td>{item.remarks}</td>
                                <td className="type-column">
                                    <span
                                        className={item.type === 'TIME IN' ? 'time-in' : item.type === 'TIME OUT' ? 'time-out' : ''}
                                    >
                                        {item.type}
                                    </span>
                                </td>
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
                    {`Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, inventoryData.length)} of ${inventoryData.length}`}
                </div>
                <div className="pagination-arrows">
                    <button
                        className="pagination-arrow"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        <MdKeyboardArrowLeft size={'20px'}/>
                    </button>
                    <button
                        className="pagination-arrow"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <MdKeyboardArrowRight size={'20px'}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Inventory;
