import React, { useState } from 'react';
import './../styles/Inventory.css';
import Sidebar from "../components/Sidebar";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";

function Inventory() {
    const [inventoryData, setInventoryData] = useState([
        { id: 1, itemName: 'Laptop', status: 'Available', quantity: 10, remarks: '', type: 'Electronics' },
        { id: 2, itemName: 'Chair', status: 'Low Stock', quantity: 3, remarks: 'Order soon', type: 'Furniture' },
    ]);

  
    const handleQuantityChange = (id, increment) => {
        setInventoryData((prevData) =>
            prevData.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + (increment ? 1 : item.quantity > 0 ? -1 : 0) }
                    : item
            )
        );
    };

    return (
        <div className="inventory-container">
            <Sidebar />
            <h1>Inventory</h1>
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
                        {inventoryData.map((item) => (
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
                                    {item.quantity}
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item.id, true)}
                                    >
                                        +
                                    </button>
                                </td>
                                <td>{item.remarks}</td>
                                <td>{item.type}</td>
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
        </div>
    );
}

export default Inventory;
