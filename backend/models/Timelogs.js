const mongoose = require('mongoose');
const moment = require('moment-timezone');  // Use moment-timezone to handle timezones correctly

const timelogsSchema = new mongoose.Schema({
    timelog_id: { 
        type: String, 
        unique: true, 
        required: true 
    },
    user_id: { 
        type: String, 
        required: true 
    },
    full_name: { 
        type: String, 
        required: true 
    },
    time: { 
        type: String,  // Store time in 12-hour format (e.g., '02:04 AM')
    },
    date: { 
        type: Date, 
        default: () => moment().tz('Asia/Manila').toDate()  // Store date in Manila time
    },
    type: { 
        type: String, 
        enum: ['LOG IN', 'LOG OUT'], 
        required: true 
    },
});

// This pre-save middleware ensures that the 'time' field gets a valid 12-hour format if it wasn't provided.
timelogsSchema.pre('save', function (next) {
    if (!this.time) {
        // If time is not provided, use the current time in 12-hour format (Manila time)
        this.time = moment().tz('Asia/Manila').format('hh:mm A');
    }
    next();
});

const Timelog = mongoose.model('Timelog', timelogsSchema);
module.exports = Timelog;
