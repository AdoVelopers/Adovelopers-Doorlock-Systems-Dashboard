const User = require('../models/Users');
const Inventory = require('../models/Inventory');

// Controller to get dashboard data
const getDashboardData = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ active: "Active" });
        const forApproval = await User.countDocuments({ approved: true });
        const totalProducts = await Inventory.countDocuments();
        
        res.status(200).json({
            totalUsers,
            activeUsers,
            forApproval,
            totalProducts, 
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard data', error: error.message });
    }
};

module.exports = { getDashboardData };
