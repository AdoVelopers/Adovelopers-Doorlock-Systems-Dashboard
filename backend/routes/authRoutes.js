const express = require('express');
const { login, logout } = require('../controllers/authController'); // Import functions

const router = express.Router();

// Define routes
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
