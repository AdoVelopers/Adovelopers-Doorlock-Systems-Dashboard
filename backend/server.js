const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const inventoryRoutes = require('./routes/inventoryRoute');
const userRoutes = require('./routes/userRoute');
const timelogsRoutes = require('./routes/timelogsRoute');

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

app.use('/api/auth', authRoutes);
app.use('/admin', dashboardRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/timelogs', timelogsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
