const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    timelog_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    log_time: {
        type: Date,
        required: true,
        default: function() { return new Date(); }, // Sets the current time when the log is created
    },
    date_logged: {
        type: Date,
        required: true,
        default: function() {
            const date = new Date();
            return new Date(date.setHours(0, 0, 0, 0)); // Removes the time part
        },
    },
    type: { 
        type: String, 
        enum: ['TIME IN', 'TIME OUT'],
        required: true // Ensure the type field is required
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Log = mongoose.model('timelogs', logSchema);

module.exports = Log;
