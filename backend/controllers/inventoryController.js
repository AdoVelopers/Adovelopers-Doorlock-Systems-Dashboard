const Inventory = require('../models/Inventory'); // Import the Inventory model

// Get all inventory items
const getAllItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new inventory item
const addItem = async (req, res) => {
  const { item_no, item_name, status, quantity, remarks, type } = req.body;

  const newItem = new Inventory({
    item_no,
    item_name,
    status,
    quantity,
    remarks,
    type
  });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an inventory item by item number
const updateItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findOneAndUpdate(
      { item_no: req.params.item_no },
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an inventory item by item number (PATCH method to update only the quantity)
const updateItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body; // Expecting quantity in the request body

    // Find the item by its item number (or _id if you prefer)
    const updatedItem = await Inventory.findOneAndUpdate(
      { item_no: req.params.item_no }, // We are using item_no to identify the item
      { quantity },                    // Only update the quantity field
      { new: true }                    // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem); // Send the updated item as a response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an inventory item by item number
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Inventory.findOneAndDelete({ item_no: req.params.item_no });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Exporting functions to be used in routes
module.exports = {
  getAllItems,
  addItem,
  updateItem,
  updateItemQuantity,
  deleteItem
};
