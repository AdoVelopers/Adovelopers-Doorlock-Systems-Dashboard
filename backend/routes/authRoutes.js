const express = require('express');
const { login, logout } = require('../controllers/authController');
const router = express.Router();
const protect = require('../middlewares/auth');

// Admin login route
router.post('/login', login);

// Admin logout route
router.post('/logout', protect, logout);

module.exports = router;
