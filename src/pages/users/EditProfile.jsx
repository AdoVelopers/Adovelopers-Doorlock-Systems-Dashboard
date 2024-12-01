import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import CustomModal from '../../components/CustomModal';
import '../../styles/EditProfile.css';

function EditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {

    setIsModalOpen(true);
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
            <input className="edit-profile-input" type="text" placeholder="Enter Full name" id="fullName" required />
          </div>
          <div className='edit-profile-input-group'>
            <label htmlFor="userID" className="edit-profile-label">User ID</label>
            <input className="edit-profile-input" id="userID" type="text" placeholder="Replace the current value in edit mode" disabled />
          </div>
        </div>

        <div className='edit-profile-email-form'>
          <label htmlFor="email" className="edit-profile-label">Email</label>
          <input className="edit-profile-input-email" type="text" id="email" placeholder="Enter your email" required />
        </div>

        <div className='edit-profile-new-email'>
          <label htmlFor="newEmail" className="edit-profile-label">New Email</label>
          <input className="edit-profile-input-new-email" type="text" id="newEmail" placeholder="Enter your new email" required />
        </div>

        <span className="edit-profile-password-container">
          <div className="edit-profile-password-group">
            <label htmlFor="oldPassword" className="edit-profile-label">Old Password</label>
            <input className="edit-profile-input" type="text" id="oldPassword" placeholder="Enter your Old Password" />
          </div>
          <div className="edit-profile-password-group">
            <label htmlFor="newPassword" className="edit-profile-label">New Password</label>
            <input className="edit-profile-input" type="text" id="newPassword" placeholder="Enter your New Password" />
          </div>
        </span>

        <div className='edit-profile-btn'>
          <button className='edit-profile-btn-cancel'>Cancel</button>
          <button className='edit-profile-btn-save' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Name Change Detected"
        onNext={handleNext}
      />
    </>
  );
}

export default EditProfile;
