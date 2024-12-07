const Settings = require('../models/Settings');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const unzipper = require('unzipper'); // Required for extracting the zip file
const fileUpload = require('express-fileupload');

// Controller to get the settings
const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne({});
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.status(200).json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to update settings
const updateSettings = async (req, res) => {
    try {
        const { theme, orgName, maintenanceMode, backupEnabled } = req.body;
        const settings = await Settings.findOneAndUpdate(
            {},  // Update the first settings document
            { theme, orgName, maintenanceMode, backupEnabled },
            { new: true, runValidators: true }  // Return the updated document
        );
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.status(200).json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Maintenance Mode Toggle
const toggleMaintenanceMode = async (req, res) => {
    try {
        const { maintenanceMode } = req.body; // Get the new maintenance mode status
        const settings = await Settings.findOneAndUpdate(
            {},
            { maintenanceMode },
            { new: true, runValidators: true }
        );

        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        res.status(200).json({
            message: `Maintenance mode ${maintenanceMode ? 'enabled' : 'disabled'}`,
            settings: settings,
        });
    } catch (error) {
        console.error('Error toggling maintenance mode:', error);
        res.status(500).json({ message: 'Failed to toggle maintenance mode', error: error.message });
    }
};

// Create Backup
const createBackup = async (req, res) => {
    try {
        const db = mongoose.connection.db; // Get the database connection
        const collections = await db.listCollections().toArray(); // Fetch all collections

        const backupDir = path.join(__dirname, '../backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir); // Create the backup directory if it doesn't exist
        }

        // Get the current date to use in the backup filename
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0]; // Format as yyyy-mm-dd
        const zipFileName = `doorlocksystems-backup-${formattedDate}.zip`; // Use the formatted date for the file name

        const zipPath = path.join(backupDir, zipFileName);
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Set compression level
        });

        // Pipe archive data to the zip file
        archive.pipe(output);

        // Loop through each collection and add it to the zip
        for (const collection of collections) {
            const collectionName = collection.name;
            const data = await db.collection(collectionName).find({}).toArray(); // Get all documents
            const jsonData = JSON.stringify(data, null, 2);

            // Append collection data to the zip
            archive.append(jsonData, { name: `${collectionName}.json` });
        }

        // Finalize the zip archive
        archive.finalize();

        output.on('close', () => {
            console.log('Backup zip created successfully');
            res.status(200).json({ message: 'Backup created successfully', backupPath: zipPath, backupFileName: zipFileName });
        });

        // Handle errors
        archive.on('error', (err) => {
            console.error('Error creating backup zip:', err);
            res.status(500).json({ message: 'Failed to create backup zip', error: err.message });
        });

    } catch (error) {
        console.error('Error during backup:', error);
        res.status(500).json({ message: 'Failed to create backup', error: error.message });
    }
};

// Endpoint to download the backup zip
const downloadBackup = (req, res) => {
    const backupDir = path.join(__dirname, '../backups');
    const zipPath = path.join(backupDir, req.query.filename || 'backup.zip'); // Ensure filename is provided in query

    if (fs.existsSync(zipPath)) {
        res.download(zipPath, (err) => {
            if (err) {
                console.error('Error sending backup file:', err);
                res.status(500).json({
                    message: 'Failed to download backup',
                    error: err.message
                });
            }
        });
    } else {
        res.status(404).json({ message: 'Backup file not found' });
    }
};

// Import Database
const importDatabase = async (req, res) => {
    console.log("Import process triggered");

    try {
        const backupDir = path.join(__dirname, '../imports');

        // Ensure the 'imports' folder exists, create it if not
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
            console.log('Created imports directory');
        }

        const file = req.files?.backupFile;  // Ensure this matches the formData field name

        // Check if a file is provided
        if (!file) {
            console.log('No file uploaded');
            return res.status(400).json({ message: 'No backup file uploaded' });
        }

        // Validate file type (must be a .zip file)
        if (!file.name.endsWith('.zip')) {
            console.log('Invalid file type');
            return res.status(400).json({ message: 'Please upload a valid .zip file' });
        }

        const zipPath = path.join(backupDir, file.name);
        console.log(`Saving zip file to: ${zipPath}`);

        // Save the uploaded zip file
        await file.mv(zipPath);
        console.log('File saved successfully');
        debugger; // Pause here to inspect the state after file is saved

        // Proceed with file extraction
        const extractedPath = path.join(backupDir, 'extracted');
        if (!fs.existsSync(extractedPath)) {
            fs.mkdirSync(extractedPath, { recursive: true });
            console.log('Extraction directory created');
        }

        // Extract the contents of the zip file
        console.log('Extracting zip file...');
        debugger; // Pause here to inspect before extraction

        await unzipper.Open.file(zipPath)
            .then(d => {
                return d.extract({ path: extractedPath });
            })
            .catch(error => {
                console.error('Error extracting zip file:', error);
                throw new Error('Failed to extract the zip file');
            });

        console.log('Zip extraction complete');
        debugger; // Pause here after extraction is done

        // Handle each extracted file (usually JSON files)
        const files = fs.readdirSync(extractedPath);
        console.log(`Found ${files.length} files to process`);
        debugger; // Pause here to inspect the files array

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            for (const fileName of files) {
                const filePath = path.join(extractedPath, fileName);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const collectionName = path.basename(fileName, '.json');
                const data = JSON.parse(fileContent);

                const collection = mongoose.connection.collection(collectionName);
                console.log(`Clearing existing data from collection: ${collectionName}`);
                await collection.deleteMany({}, { session }); // Clear existing records

                // Insert new data if it exists
                if (data.length > 0) {
                    console.log(`Inserting ${data.length} records into collection: ${collectionName}`);
                    await collection.insertMany(data, { session });
                } else {
                    console.log(`No data to insert in collection: ${collectionName}`);
                }
            }

            // Commit the transaction if successful
            await session.commitTransaction();
            session.endSession();
            console.log('Database restored successfully');
            res.status(200).json({ message: 'Database restored successfully' });

        } catch (error) {
            console.error('Error during database restoration:', error);
            await session.abortTransaction();
            session.endSession();
            res.status(500).json({ message: 'Failed to restore database', error: error.message });
        }

    } catch (error) {
        console.error('Error in importDatabase controller:', error);
        res.status(500).json({ message: 'Failed to process the database import', error: error.message });
    }
};

// Reset Database
const resetDatabase = async (req, res) => {
    try {
        console.log("Starting database reset...");
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log("Collections found:", collections);

        // Loop through collections and drop them
        for (const collection of collections) {
            const collectionName = collection.name;
            await db.collection(collectionName).drop();
            console.log(`Dropped collection: ${collectionName}`);
        }

        res.status(200).json({ message: 'Database reset successful' });
    } catch (error) {
        console.error('Error resetting database:', error);
        res.status(500).json({ message: 'Error resetting database', error: error.message });
    }
};

module.exports = { getSettings, updateSettings, createBackup, downloadBackup, importDatabase, resetDatabase, toggleMaintenanceMode };
