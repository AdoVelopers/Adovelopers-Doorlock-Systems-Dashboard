const crypto = require('crypto');
const User = require('../models/Users');
const Blacklist = require('../models/Blacklist');
const Log = require('../models/Log');
const jwt = require('jsonwebtoken');
const verifyPassword = require('../middlewares/verifyPassword');
const generateToken = require('../utils/generateToken');

// Admin login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`Login attempt for email: ${email}`);

        // Find the admin user by email and role
        const user = await User.findOne({ email, role: 'ADMIN' });

        if (!user) {
            console.error('Admin not found');
            return res.status(401).json({ message: 'No User found with this Email' });
        }

        // Check if the user is already logged in
        if (user.token) {
            console.warn('User is already logged in');
            return res.redirect('/admin/dashboard');
        }

        // Verify the password using the middleware
        const isPasswordMatch = verifyPassword(user.password, password);

        if (!isPasswordMatch) {
            console.error('Password mismatch');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If the password matches, generate a token and respond with user data
        const token = generateToken(user._id); // Generate a JWT token

        // Update the user document with the new token
        user.token = token;
        user.active = true;
        await user.save(); 

        // Create a log record for the login
        await Log.create({
            user: user._id,
            user_id: user._id.toString(),
            full_name: user.full_name, // Ensure this field exists in your User model
            login_method: 'ADMINPAGE',
            session_id: token, // You might want to store the token or session ID
        });

        res.json({
            _id: user._id,
            email: user.email,
            role: user.role,
            token: token, // Include the generated token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin logout function (handled on the frontend by clearing the token)
exports.logout = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer

        if (token) {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find the log record for the current session and update it
            await Log.updateOne(
                { session_id: token }, // Match the session ID
                { logout_time: new Date() } // Set the logout time to now
            );

            // Create an expiration date for the token
            const expiresAt = new Date(decoded.exp * 1000); // Convert to Date

            // Add the token to the blacklist
            await Blacklist.create({ token, expiresAt });

            // Remove the token from the user's record and set active to false
            await User.updateOne(
                { _id: decoded.id }, // Match the user by ID
                { 
                    $unset: { token: "" }, // Remove the token field
                    $set: { active: false }  // Set active to false
                } 
            );

            res.json({ message: 'Logged out successfully' });
        } else {
            return res.status(400).json({ message: 'No token provided' });
        }
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


