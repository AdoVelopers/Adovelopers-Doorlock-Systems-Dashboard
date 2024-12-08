import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Swal from 'sweetalert2';
import axios from 'axios'; // Ensure axios is imported
import '../../styles/EditProfile.css';

function EditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(''); // Make sure to set userId when the component loads

  // Function to handle saving the profile
  const handleSave = () => {
    const userId = localStorage.getItem('user_id');  // Get the userId from localStorage

    if (!userId) {
      Swal.fire('Error!', 'User is not logged in.', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save the changes to your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Prepare form data to send to the server
        const formData = new FormData();
        formData.append('fullName', fullName);

        if (email) formData.append('email', email);
        if (newEmail) formData.append('newEmail', newEmail);
        if (oldPassword) formData.append('oldPassword', oldPassword);
        if (newPassword) formData.append('newPassword', newPassword);
        if (profileImage) formData.append('profileImage', profileImage);

        axios.put(`http://54.252.176.21:3030/api/users/${userId}/update-profile`, formData)
          .then(response => {
            Swal.fire(
              'Saved!',
              'Your profile has been updated.',
              'success'
            ).then(() => {
              // After the "OK" button is pressed, reload the page
              window.location.reload();
            });
          })
          .catch(error => {
            Swal.fire('Error!', 'There was an issue saving your profile.', 'error');
          });
      }
    });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Store the file directly
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    console.log("Proceeding with next step");
    setIsModalOpen(false);
  };

  return (
    <>
      <Sidebar />
      <div className='edit-profile-form'>
        <p>Edit Profile</p>
        <div className='edit-profile-form-container'>
          <div className='edit-profile-input-group'>
            <label htmlFor="fullName" className="edit-profile-label">Full name</label>
            <input
              className="edit-profile-input"
              type="text"
              placeholder="Enter Full name"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Bind to state
              required
            />
          </div>
          <div className='edit-profile-input-group'>
            <label htmlFor="userID" className="edit-profile-label">User ID</label>
            <input
              className="edit-profile-input"
              id="userID"
              type="text"
              placeholder="Replace the current value in edit mode"
              disabled
              value={userId} // Bind to state
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="edit-profile-input-image">
          <label htmlFor="profileImage" className="edit-profile-label">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          {profileImage && (
            <div className="profile-image-preview">
              <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" />
            </div>
          )}
        </div>

        {/* <div className='edit-profile-email-form'>
          <label htmlFor="email" className="edit-profile-label">Email</label>
          <input
            className="edit-profile-input-email"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Bind to state
          />
        </div>

        <div className='edit-profile-new-email'>
          <label htmlFor="newEmail" className="edit-profile-label">New Email</label>
          <input
            className="edit-profile-input-new-email"
            type="email"
            id="newEmail"
            placeholder="Enter your new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)} // Bind to state
          />
        </div> */}

        <span className="edit-profile-password-container">
          <div className="edit-profile-password-group">
            <label htmlFor="oldPassword" className="edit-profile-label">Old Password</label>
            <input
              className="edit-profile-input"
              type="password"
              id="oldPassword"
              placeholder="Enter your Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)} // Bind to state
            />
          </div>
          <div className="edit-profile-password-group">
            <label htmlFor="newPassword" className="edit-profile-label">New Password</label>
            <input
              className="edit-profile-input"
              type="password"
              id="newPassword"
              placeholder="Enter your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // Bind to state
            />
          </div>
        </span>

        <div className='edit-profile-btn'>
          <button className='edit-profile-btn-cancel' onClick={handleCancel}>Cancel</button>
          <button className='edit-profile-btn-save' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
