import React, { useState } from 'react';
import '../../styles/SignUp.css';
import FingerPrint from '../../assets/Frame.png';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    // ready sa backend 
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { fullName, email, password, confirmPassword });
      console.log(response.data);ion
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

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
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="fullName" className="signup-form-label">
                Full Name 
                <span className="asterisk">*</span>
              </label>
              <input type="text" id="fullName" className="signup-form-input" placeholder="Enter Full Name" value={formData.fullName} onChange={handleInputChange} />
            </div>
            <div className="signup-form-group">
              <label htmlFor="email" className="signup-form-label">
                Email Address 
                <span className="asterisk">*</span>
              </label>
              <input type="email" id="email" className="signup-form-input" placeholder='Enter Email' value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password" className="signup-form-label">
                Password 
                <span className="asterisk">*</span>
              </label>
              <input type="password" id="password" className="signup-form-input" placeholder='Enter Password' value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="signup-form-group">
              <label htmlFor="confirmPassword" className="signup-form-label">
                Confirm Password 
                <span className="asterisk">*</span>
              </label>
              <input type="password" id="confirmPassword" className="signup-form-input" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleInputChange} />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="signup-terms-checkbox">
              <input type="checkbox" id="agree" />
              <span>I have read and agree to the <a href="#" className="signup-terms-link">Terms of Service</a></span>
            </div>
            <button type="submit" className="signup-submit-btn">Register</button>
          </form>
          <p className="signup-login-link">
            Already have an account? 
            <a href="/" className="signup-login-btn">Log in</a>
          </p>
        </div>
      </div>
      <div className='circle-btn1'></div>
      <div className='circle-btn2'></div>
    </div>
  );
}

export default SignUp;
