const express = require('express');
const inventoryController = require('../controllers/inventoryController'); // Import the controller

const router = express.Router();

// Get all inventory items
router.get('/', inventoryController.getAllItems);

// Add a new inventory item
router.post('/', inventoryController.addItem);

// Update an inventory item by item number
router.put('/:item_no', inventoryController.updateItem);

router.patch('/:item_no', inventoryController.updateItemQuantity);

// Delete an inventory item by item number
router.delete('/:item_no', inventoryController.deleteItem);

// Export the router to be used in other files
module.exports = router;
