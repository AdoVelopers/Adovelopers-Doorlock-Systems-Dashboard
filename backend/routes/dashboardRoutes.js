const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const protect = require('../middlewares/auth');

const router = express.Router();

// Protected route to get dashboard data
router.get('/dashboard', protect, getDashboardData); // Call the controller directly

module.exports = router;
