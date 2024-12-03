const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const inventoryRoutes = require('./routes/inventoryRoute'); // Import inventory routes

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// Call the connectDB function to initiate the connection
connectDB();

const app = express();
app.use(express.json());
app.use(cors());  // Allows all origins

// Use the auth routes for admin login/logout
app.use('/api/auth', authRoutes);

// Use the dashboard routes for fetching dashboard data
app.use('/admin', dashboardRoutes);

// Use the inventory routes for managing inventory
app.use('/api/inventory', inventoryRoutes);  // Add this line to use the inventory routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
