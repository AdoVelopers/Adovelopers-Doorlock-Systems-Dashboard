const mongoose = require('mongoose');
const Userdata = require('./Users'); // Import the Userdata model

const timelogsSchema = new mongoose.Schema({
    timelog_id: { type: String, unique: true, required: true },
    user_id: { type: String, required: true },
    full_name: {type: String, required: true},
    time: { type: String },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['LOG IN', 'LOG OUT'] }, 
});

const Timelog = mongoose.model('Timelog', timelogsSchema);
module.exports = Timelog;
