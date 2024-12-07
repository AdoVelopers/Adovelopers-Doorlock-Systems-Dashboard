const express = require('express');
const { 
    getSettings, 
    updateSettings, 
    createBackup, 
    downloadBackup, 
    importDatabase, 
    resetDatabase, 
    toggleMaintenanceMode 
} = require('../controllers/settingsController');
const router = express.Router();
const fileUpload = require('express-fileupload');

// Use the fileUpload middleware
router.use(fileUpload());

// Route to get settings
router.get('/', getSettings);

// Route to update settings
router.put('/', updateSettings);

// Route to create a backup
router.post('/backup', createBackup);

// Route to download the backup
router.get('/download-backup', downloadBackup);

// Route to import the database
router.post('/import', importDatabase);

// Route to reset the database
router.post('/reset', resetDatabase);

// Route to toggle maintenance mode
router.post('/maintenance', toggleMaintenanceMode);

module.exports = router;
