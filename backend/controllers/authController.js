const User = require('../models/Users');
const Blacklist = require('../models/Blacklist');
const Timelog = require('../models/Timelogs');
const jwt = require('jsonwebtoken');
const verifyPassword = require('../middlewares/verifyPassword');
const generateToken = require('../utils/generateToken');
const moment = require('moment-timezone');

// Function to generate a 6-character timelog_id with 'TL' and 8 random digits
const generateTimelogId = () => {
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000); // 8 random digits
    return `TL${randomDigits}`;
};

// Admin login using user_id
const login = async (req, res) => {
    const { user_id, password } = req.body;

    try {
        // Fetch the user by user_id
        const user = await User.findOne({ user_id });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (!user.approved) {
            return res.status(403).json({statusCode: "Pending",  message: 'Your account is pending approval. Please contact the administrator.' });
        }

        // Check if the password matches
        const isPasswordMatch = verifyPassword(user.password, password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        // Generate a token for the session
        const token = generateToken(user._id);

        // Set the token as a cookie (with security options)
        res.cookie('token', token, {
            httpOnly: true,  // The cookie is only accessible by the server
            secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
            sameSite: 'None',  // Required for cross-origin requests
            maxAge: 60 * 60 * 1000,  // Set the expiry time of the cookie (1 hour)
        });

        // Mark the user as active
        user.active = Active;
        await user.save();

        // Generate a timelog ID
        const timelog_id = generateTimelogId();

        // Get the current time in Manila (Asia/Manila timezone)
        const localDate = moment().tz('Asia/Manila').toDate();  // Fixed timezone to Asia/Manila

        // Create a new timelog entry
        await Timelog.create({
            timelog_id: timelog_id,
            user_id: user.user_id,
            full_name: user.full_name,
            login_method: 'ADMINPAGE',  // The method of login
            session_id: token,  // Session ID (JWT token)
            type: 'LOG IN',  // Type of log (LOG IN)
            date: localDate,  // Save the Manila time (corrected)
        });

        // Respond with the user data and success message
        res.status(200).json({
            _id: user._id,
            user_id: user.user_id,
            role: user.role,
            message: 'Logged in successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });  // Handle server errors
    }
};


// Admin logout using token
const logout = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await Log.updateOne(
            { session_id: token },
            { logout_time: new Date() }
        );

        const expiresAt = new Date(decoded.exp * 1000);

        await Blacklist.create({ token, expiresAt });

        await User.updateOne(
            { _id: decoded.id },
            {
                $unset: { token: "" },
                $set: { active: false },
            }
        );

        // Create a unique timelog_id for logout (TL + 8 random digits)
        const timelog_id = generateTimelogId();

        // Create the timelog entry with 'LOG OUT' type
        await Timelog.create({
            timelog_id: timelog_id,
            user_id: decoded.id,
            full_name: decoded.full_name,
            session_id: token,
            type: 'LOG OUT',  // Ensure 'type' is provided
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Exporting functions to be used in routes
module.exports = {
    login,
    logout,
};
