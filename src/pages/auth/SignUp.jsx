import React from 'react';
import '../../styles/SignUp.css';
import FingerPrint from '../../assets/Frame.png';

function SignUp() {
    return (
        <div className="signup-container">
            <div className="signup-left-pane">
                <h1 className="signup-title">AdoVelopers</h1>
                <p className="signup-subtitle">The best fingerprint locked door.</p>
                <button className="signup-read-more-btn">Read More</button>
            </div>
            <div className="signup-right-pane">
                <div className="signup-form-container">
                    <div className="signup-form-header">
                        <div><img src={FingerPrint} alt="" /></div>
                        <h2 className="signup-form-title">Create an Account</h2>
                        <p className="signup-form-subtitle">Fill up the forms and scan your Touch ID.</p>
                    </div>
                    <form className="signup-form">
                        <div className="signup-form-group">
                            <label htmlFor="fullName" className="signup-form-label">Full Name <span className="required" style={{ color: 'red' }}>*</span></label>
                            <input type="text" id="fullName" className="signup-form-input" placeholder="Enter Full Name" />
                        </div>
                        <div className="signup-form-group">
                            <label htmlFor="email" className="signup-form-label">Email Address <span className="required" style={{ color: 'red' }}>*</span></label>
                            <input type="email" id="email" className="signup-form-input" placeholder='Enter Email' />
                        </div>
                        <div className="signup-form-group">
                            <label htmlFor="password" className="signup-form-label">Password <span className="required" style={{ color: 'red' }}>*</span></label>
                            <div className="signup-password-container">
                                <input type="password" id="password" className="signup-form-input" placeholder='Enter Password' />
                                <i className="fas fa-eye signup-eye-icon"></i>
                            </div>
                        </div>
                        <div className="signup-form-group">
                            <label htmlFor="confirmPassword" className="signup-form-label">Confirm Password <span className="required" style={{ color: 'red' }}>*</span></label>
                            <div className="signup-password-container">
                                <input type="password" id="confirmPassword" className="signup-form-input" placeholder='Confirm Password' />
                                <i className="fas fa-eye signup-eye-icon"></i>
                            </div>
                        </div>
                        <div className="signup-terms-checkbox">
                            <input type="checkbox" id="agree" />
                            <span>I have read and agree to the <a href="#" className="signup-terms-link">Terms of Service</a></span>
                        </div>
                        <button className="signup-submit-btn">Register</button>
                    </form>
                    <p className="signup-login-link">Already have an account? <a href="#" className="signup-login-btn">Log in</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
