const express = require('express');
const timelogsController = require('../controllers/timelogsController');

const router = express.Router();

// Get all inventory items
router.get('/', timelogsController.getTimelogs);

// Export the router to be used in other files
module.exports = router;
