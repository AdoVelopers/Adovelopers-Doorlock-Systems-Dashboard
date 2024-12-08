const Users = require('../models/Users');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded files in the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        const userId = req.params.user_id;  // Get user_id from the URL parameters
        if (userId) {
            // Set the filename to user_id with the appropriate file extension
            const ext = path.extname(file.originalname); // Get file extension
            cb(null, `${userId}${ext}`);  // Set file name to user_id.ext
        } else {
            cb(new Error('User ID is missing'), null);
        }
    },
});


const upload = multer({ storage: storage });

// Get all inventory items
const getAllUsers = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await Users.find({ user_id: req.params.user_id }); // Assuming user_id is passed as a URL parameter
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await Users.find({ role: { $in: ["ADMIN", "SUPERADMIN"] } });
        res.status(200).json(admins);
        console.log("ADMINS: ", admins)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getClients = async (req, res) => {
    try {
        const client = await Users.find({ role: "CLIENT" });
        res.status(200).json(client);
        console.log("Clients: ", client)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const forApproval = async (req, res) => {
    try {
        const for_approval = await Users.find({ approved: false });
        res.status(200).json(for_approval);
        console.log("Pending Applications: ", for_approval)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user profile (PUT request)
const updateUserProfile = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { fullName, email, newEmail, oldPassword, newPassword } = req.body;

        // Check if a file was uploaded and get its path
        const profileImagePath = req.file ? `/uploads/${req.file.filename}` : null;
        console.log('Profile Image Path:', profileImagePath); // Debugging log

        // Create an object to update
        const updatedProfile = {};
        if (fullName) updatedProfile.full_name = fullName;  // Ensure consistency with the field in schema
        if (email) updatedProfile.email = email;
        if (newEmail) updatedProfile.newEmail = newEmail;
        if (oldPassword) updatedProfile.oldPassword = oldPassword;
        if (newPassword) updatedProfile.newPassword = newPassword;
        if (profileImagePath) updatedProfile.profileImagePath = profileImagePath;  // Save the path

        // Find the user by user_id and update the profile
        const user = await Users.findOneAndUpdate({ user_id }, updatedProfile, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PLEASE DONATE FOR SPOTIFY PREMIUM 

// Exporting functions to be used in routes
module.exports = {
    getAllUsers,
    forApproval,
    getAdmins,
    getClients,
    getUser,
    updateUserProfile,
    upload,  // Ensure upload is exported
};
