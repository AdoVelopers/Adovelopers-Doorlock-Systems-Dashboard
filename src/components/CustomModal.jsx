import React from 'react';
import '../styles/CustomModal.css';

const CustomModal = ({ isOpen, onClose, title, message, onNext }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <p className="modal-info-message" style={{marginLeft: '10px'}}>An admin will review your request shortly.</p>
        </div>
        <div className="modal-body">
          <div className="check-icon-container">
            <div className="custom-check-icon"></div> 
          </div>
          <p className="modal-info-message">
            A name change request has been sent to admin, kindly wait for approval.
          </p>
        </div>
        <div className="modal-footer">
          <button className="modal-button cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
