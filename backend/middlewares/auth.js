const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist'); 

const protect = async (req, res, next) => {
    let token;
    console.log("Authorization Header:", req.headers.authorization);
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log("Token received:", token);

            // Check if the token is blacklisted
            const isBlacklisted = await Blacklist.findOne({ token });
            console.log("Is token blacklisted?", isBlacklisted ? 'Yes' : 'No');

            if (isBlacklisted) {
                return res.status(401).json({ message: 'Token has been revoked, please log in again' });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next(); // Proceed to the next middleware
        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;
