import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import '../styles/Settings.css';

function Settings() {
  const [orgName, setOrgName] = useState('');
  const [currentOrgName, setCurrentOrgName] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [initialState, setInitialState] = useState({
    orgName: '',
    theme: 'light',
    maintenanceMode: false,
  });
  const [uploadingFile, setUploadingFile] = useState(null);  // For tracking the uploaded file
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://54.252.176.21:3030/settings');
        console.log('API Response:', response.data);

        if (response.data) {
          setOrgName(response.data.orgName || '');
          setCurrentOrgName(response.data.orgName || '');
          setTheme(response.data.theme || 'light');
          setIsMaintenanceMode(response.data.maintenanceMode || false);

          // Store initial state values for reset functionality
          setInitialState({
            orgName: response.data.orgName || '',
            theme: response.data.theme || 'light',
            maintenanceMode: response.data.maintenanceMode || false,
          });
        } else {
          console.error('Settings data is missing required fields.');
        }
      } catch (error) {
        console.error('Error fetching settings:', error.message);
      }
    };

    fetchSettings();
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Cancel button handler
  const handleCancel = () => {
    setOrgName(initialState.orgName);
    setTheme(initialState.theme);
    setIsMaintenanceMode(initialState.maintenanceMode);
  }

  // Save settings
  const handleSave = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save the changes to the website?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put('http://54.252.176.21:3030/settings', {
          orgName: orgName,
          theme: theme,
          maintenanceMode: isMaintenanceMode
        })
          .then(() => {
            Swal.fire('Saved!', 'Website updated successfully.', 'success');
            setCurrentOrgName(orgName);
          })
          .catch((error) => {
            Swal.fire('Error', 'There was an error saving the settings.', 'error');
            console.error('Error saving settings:', error);
          });
      }
    });
  };

  const handleMaintenanceModeToggle = () => {
    const newMaintenanceMode = !isMaintenanceMode; // Toggle maintenance mode status

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${newMaintenanceMode ? 'enable' : 'disable'} maintenance mode?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `${newMaintenanceMode ? 'Enable' : 'Disable'} Maintenance Mode`,
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Step 1: Send API request to the backend to update the maintenance mode
        axios.post('http://54.252.176.21:3030/settings/maintenance', {
          maintenanceMode: newMaintenanceMode
        })
          .then((response) => {
            // Step 2: Update the frontend state after successful response
            setIsMaintenanceMode(newMaintenanceMode);
            Swal.fire(
              `${newMaintenanceMode ? 'Maintenance Enabled' : 'Maintenance Disabled'}`,
              `The website is now ${newMaintenanceMode ? 'in maintenance' : 'live'}.`,
              'success'
            );
          })
          .catch((error) => {
            Swal.fire('Error', 'Failed to update maintenance mode.', 'error');
            console.error('Error:', error);
          });
      }
    });
  };

  // Client-side function to handle database backup and download
  const handleDatabaseBackup = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create a backup of the database?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, backup it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Make API call to create the backup
        axios.post('http://54.252.176.21:3030/settings/backup')
          .then((response) => {
            Swal.fire('Backup Created!', 'Your database has been backed up.', 'success');

            // After backup is created, trigger download
            const backupFileName = response.data.backupFileName; // Get the file name from response

            // Call the download endpoint
            axios.get(`http://54.252.176.21:3030/settings/download-backup`, {
              responseType: 'blob' // Ensure the response is a binary file
            })
              .then((response) => {
                // Create a link to trigger the download
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement('a');
                a.href = url;
                a.download = backupFileName; // Use the dynamic filename
                document.body.appendChild(a);
                a.click();
                a.remove(); // Clean up the link element
              })
              .catch((error) => {
                Swal.fire('Error', 'There was an error downloading the backup.', 'error');
                console.error('Error downloading backup:', error);
              });
          })
          .catch((error) => {
            Swal.fire('Error', 'There was an error creating the backup.', 'error');
            console.error('Error creating backup:', error);
          });
      }
    });
  };

  // Database Reset
  const handleDatabaseReset = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reset the database? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://54.252.176.21:3030/settings/reset')
          .then(() => {
            Swal.fire('Reset Successful', 'Your database has been reset.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'There was an error resetting the database.', 'error');
            console.error('Error resetting database:', error);
          });
      }
    });
  };

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Debug: Log the dropped file
    console.log('Dropped file:', file);
    debugger; // This will trigger a breakpoint in your browser's developer tools

    if (file && file.name.endsWith('.zip')) {
      setUploadingFile(file.name); // Set the file name for display
      const formData = new FormData();
      formData.append('backupFile', file); // Correct field name for formData

      // Debug: Log the form data
      console.log('Form data prepared:', formData);
      debugger; // Trigger a breakpoint here to check formData contents

      // Step 1: Ask for a password before proceeding
      const passwordResult = await Swal.fire({
        title: 'Enter Password',
        input: 'password',
        inputLabel: 'Please enter the password to proceed.',
        inputPlaceholder: 'Password',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Submit',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a password';
          }
          // Validate the entered password
          if (value !== 'pass123') {  // Replace 'yourPassword' with your actual password
            return 'Incorrect password';
          }
        }
      });

      // If the password is incorrect or the user cancels, abort the process
      if (passwordResult.isDismissed || passwordResult.value !== 'pass123') {
        Swal.fire('Error', 'Incorrect password or action cancelled.', 'error');
        setUploadingFile(null); // Reset file upload state
        return;
      }

      // Step 2: Ask for confirmation to reset and restore the database
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will replace the current database with the imported data. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, replace it!',
        cancelButtonText: 'No, cancel',
      });

      // Debug: Log the result of the confirmation
      console.log('Confirmation result:', result);
      debugger; // Trigger a breakpoint here to check if confirmation worked as expected

      if (result.isConfirmed) {
        try {
          // Step 1: Reset the current database first
          console.log('Resetting the database...');
          debugger; // Check before making the reset request
          await axios.post('http://54.252.176.21:3030/settings/reset'); // Await the reset
          console.log('Database reset completed.');
          debugger; // Check after reset

          // Step 2: Import the new database backup after reset
          console.log('Starting database import...');
          debugger; // Check before the import request
          await axios.post('http://54.252.176.21:3030/settings/import', formData, {
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              setUploadProgress(Math.round((loaded * 100) / total)); // Calculate and update progress

              // Debug: Log upload progress
              console.log(`Progress: ${Math.round((loaded * 100) / total)}%`);
              debugger; // Check progress calculations
            },
          });

          Swal.fire('Import Successful', 'Your database has been replaced successfully.', 'success');
          setUploadingFile(null);
          setUploadProgress(0); // Reset progress bar
        } catch (error) {
          Swal.fire('Error', 'There was an error during the process.', 'error');
          setUploadingFile(null);
          setUploadProgress(0); // Reset progress bar
          console.error('Error:', error);
        }
      } else {
        setUploadingFile(null); // Reset file upload state if cancelled
      }
    } else {
      Swal.fire('Invalid File', 'Please upload a valid .zip file.', 'error');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: '.zip',
    multiple: false,
  });

  return (
    <>
      <Sidebar />
      <div className='edit-profile-form'>
        <p>Edit Website</p>
        <div className='edit-profile-form-container'>
          {/* Organization Name Input */}
          <div className='edit-profile-input-group'>
            <label htmlFor="orgName" className="edit-profile-label">Organization Name</label>
            <input
              className="edit-profile-input"
              type="text"
              placeholder={currentOrgName || 'Enter organization name'}
              id="orgName"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
          </div>

          {/* Theme Selector */}
          <div className='edit-profile-input-group'>
            <label htmlFor="theme" className="edit-profile-label">Choose Theme</label>
            <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)} className="edit-profile-input">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Drag and Drop for Importing Database */}
          <div className="db-import-section">
            <h3 className="db-import-title">Import Database Backup</h3>
            <div className='db-import-group'
              {...getRootProps()}
              style={{
                border: '2px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '10px'
              }}
            >
              <input {...getInputProps()} />
              {!uploadingFile && <p>Drag & Drop ZIP File Here or Click to Select</p>}
              {uploadingFile && <p>Uploading: {uploadingFile}</p>} {/* Displaying file name during upload */}
              {uploadingFile && (
                <div style={{ marginTop: '10px' }}>
                  <progress value={uploadProgress} max="100" style={{ width: '100%' }}></progress>
                </div>
              )}
            </div>
          </div>

          {/* Backup and Reset Buttons */}
          <div className='db-action-group'>
            <button className='edit-profile-btn-backup' onClick={handleDatabaseBackup}>Backup Database</button>
          </div>
          <div className='db-action-group'>
            <button className='edit-profile-btn-reset' onClick={handleDatabaseReset}>Reset Database</button>
          </div>
          <div className='db-action-group'>
            <button className='edit-profile-btn-maintenance' onClick={handleMaintenanceModeToggle}>Maintenance Mode</button>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className='edit-profile-btn'>
          <button className='edit-profile-btn-cancel' onClick={handleCancel}>Cancel</button>
          <button className='edit-profile-btn-save' onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
}

export default Settings;
