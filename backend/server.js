const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const inventoryRoutes = require('./routes/inventoryRoute');
const userRoutes = require('./routes/userRoute');
const timelogsRoutes = require('./routes/timelogsRoute');
const settingsRoutes = require('./routes/settingsRoute');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {});
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

// CORS Configuration: Allow credentials and specify allowed origins
app.use(cors({
    origin: [
        'http://54.252.176.21',          // Allow requests from the base domain (port 80)
        'http://54.252.176.21:8080',     // Allow requests from port 8080
    ],
    credentials: true,  // Allows cookies to be sent and received
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use('/dashboard', dashboardRoutes);
app.use('/api', authRoutes);  // Route for login
app.use('/api/inventory', inventoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/timelogs', timelogsRoutes);
app.use('/settings', settingsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
