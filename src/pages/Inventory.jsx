import React, { useState, useEffect } from 'react';
import './../styles/Inventory.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios'; // Import Axios for HTTP requests

function Inventory() {
    const [inventoryData, setInventoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Fetch data when the component mounts
    useEffect(() => {
        // Replace the URL with your actual backend URL
        axios.get('http://54.252.176.21:3030/api/inventory')
            .then((response) => {
                setInventoryData(response.data); // Set the fetched data to state
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const totalPages = Math.ceil(inventoryData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = inventoryData.slice(startIndex, startIndex + itemsPerPage);

    const handleQuantityChange = (id, increment) => {
        const itemToUpdate = inventoryData.find((item) => item._id === id);
    
        if (!itemToUpdate) return;
    
        const newQuantity = itemToUpdate.quantity + (increment ? 1 : itemToUpdate.quantity > 0 ? -1 : 0);
    
        if (newQuantity < 0) return;
    
        const updatedData = inventoryData.map((item) =>
            item._id === id ? { ...item, quantity: newQuantity } : item
        );
        setInventoryData(updatedData);
    
        axios
            .patch(`http://54.252.176.21:3030/api/inventory/${itemToUpdate.item_no}`, { quantity: newQuantity })
            .then((response) => {
                console.log("Quantity updated successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
                setInventoryData((prevData) =>
                    prevData.map((item) =>
                        item._id === id ? { ...item, quantity: itemToUpdate.quantity } : item
                    )
                );
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update the quantity. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setInventoryData((prevData) =>
            prevData.map((item) =>
                item._id === editingItem._id ? editingItem : item
            )
        );
        closeModal();

        Swal.fire({
            title: 'Success!',
            text: 'Item details have been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, this item cannot be recovered!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setInventoryData((prevData) => prevData.filter(item => item._id !== id)); // Change 'id' to '_id'
                Swal.fire(
                    'Deleted!',
                    'The item has been deleted.',
                    'success'
                );
            }
        });
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
                            <tr key={item._id}> {/* Use _id instead of id */}
                                <td>{item.item_no}</td> {/* Replace id with item_no if necessary */}
                                <td>{item.item_name}</td> {/* Replace itemName if necessary */}
                                <td className={item.status === 'Available' ? 'green' : 'red'}>
                                    {item.status}
                                </td>
                                <td>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item._id, false)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-box">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item._id, true)}
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
                                    <button className="editbtn" onClick={() => openEditModal(item)}>
                                        <img src={Edit} alt="Edit" />
                                    </button>
                                    <button className="deletebtn" onClick={() => handleDelete(item._id)}>
                                        <img src={Delete} alt="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="inventory-modal-overlay">
                    <div className="inventory-modal-content">
                        <h2>Edit Item</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label htmlFor="itemName">Item Name</label>
                                <input
                                    type="text"
                                    id="itemName"
                                    value={editingItem.item_name}
                                    onChange={(e) => setEditingItem({ ...editingItem, item_name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    value={editingItem.status}
                                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Low Stock">Low Stock</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={editingItem.quantity}
                                    onChange={(e) => setEditingItem({ ...editingItem, quantity: +e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="remarks">Remarks</label>
                                <input
                                    type="text"
                                    id="remarks"
                                    value={editingItem.remarks}
                                    onChange={(e) => setEditingItem({ ...editingItem, remarks: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <select
                                    id="type"
                                    value={editingItem.type}
                                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                                >
                                    <option value="TIME IN">TIME IN</option>
                                    <option value="TIME OUT">TIME OUT</option>
                                </select>
                            </div>
                            <div className="inventory-modal-footer">
                                <button type="button" onClick={closeModal}>Cancel</button>
                                <button type="submit">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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

export default Inventory;
