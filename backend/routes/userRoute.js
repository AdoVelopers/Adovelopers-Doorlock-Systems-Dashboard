const express = require('express');
const userController = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Get all inventory items
router.get('/', userController.getAllUsers);
router.get('/admins', userController.getAdmins);
router.get('/clients', userController.getClients);
router.get('/forApproval', userController.forApproval);


// Export the router to be used in other files
module.exports = router;
