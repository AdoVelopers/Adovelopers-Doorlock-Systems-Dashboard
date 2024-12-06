const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: String, unique: true, required: true },
    full_name: { type: String, required: true },
    // email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fingerprint_id: { type: Buffer },
    template_position: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    active: { type: String, default: "Inactive" },
    approved: { type: Boolean, default: false },
    role: { type: String, enum: ['CLIENT', 'ADMIN', 'SUPERADMIN'], default: 'CLIENT' },
    token: { type: String },
    last_login: { type: Date }
});

const Userdata = mongoose.model('userData', userSchema);

module.exports = Userdata;
