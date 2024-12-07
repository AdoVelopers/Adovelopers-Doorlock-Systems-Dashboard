const mongoose = require('mongoose');

// Define the settings schema with additional fields
const settingsSchema = new mongoose.Schema({
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },  // Theme preference
    orgName: { type: String, required: true },  // Organization Name
    maintenanceMode: { type: Boolean, default: false },  // Flag for maintenance mode
    backupEnabled: { type: Boolean, default: true },  // Flag for backup records
    databaseBackup: { 
        type: Date, 
        default: Date.now,  // Last database backup timestamp
    },
    createdAt: { 
        type: Date, 
        default: Date.now,  // When settings were created
    },
    updatedAt: { 
        type: Date, 
        default: Date.now,  // When settings were last updated
    }
});

// Middleware to update `updatedAt` before saving
settingsSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Model creation
const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;
