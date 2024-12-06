const Timelogs = require('../models/Timelogs'); // Import the Inventory model

// Get all inventory items
const getTimelogs = async (req, res) => {
  try {
    const timelogs = await Timelogs.find();
    res.status(200).json(timelogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// PLEASE DONATE FOR SPOTIFY PREMIUM 

// Exporting functions to be used in routes
module.exports = {
    getTimelogs

};
