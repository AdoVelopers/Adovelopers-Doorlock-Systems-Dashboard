const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false // Default value for unread notifications
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
