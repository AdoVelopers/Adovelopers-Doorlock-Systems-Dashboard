const User = require('../models/Users'); // Adjust the path as necessary
const Log = require('../models/Log'); // Adjust the path to your Log model
const Notification = require('../models/Notification'); // Adjust the path to your Notification model

// Controller to fetch dashboard data
exports.getDashboardData = async (req, res) => {
    console.log("User ID:", req.user._id); // Log the user ID
    try {
        const totalUsers = await User.countDocuments();
        const totalLogs = await Log.countDocuments();
        const totalNotifications = await Notification.countDocuments(); // Uncomment if you want to include this

        res.json({
            totalUsers,
            totalLogs,
            totalNotifications, // Uncomment if you want to include this
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
