const mongoose = require('mongoose');

// Define the inventory schema
const inventorySchema = new mongoose.Schema({
  item_no: {
    type: String,
    required: true,
    unique: true
  },
  item_name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

// Create the inventory model
const Inventory = mongoose.model('Inventory', inventorySchema);

// Export the Inventory model
module.exports = Inventory;
