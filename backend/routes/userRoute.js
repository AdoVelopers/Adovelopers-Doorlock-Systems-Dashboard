const express = require('express');
const userController = require('../controllers/userController');
const { upload } = userController;

const router = express.Router();

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get admins
router.get('/admins', userController.getAdmins);

// Route to get clients
router.get('/clients', userController.getClients);

// Route for users pending approval
router.get('/forApproval', userController.forApproval);

// Route to get a specific user by their user_id
router.get('/:user_id', userController.getUser);  // Added this route for getting a user by ID

router.put('/:user_id/update-profile', upload.single('profileImage'), userController.updateUserProfile);


// Export the router to be used in other files
module.exports = router;
