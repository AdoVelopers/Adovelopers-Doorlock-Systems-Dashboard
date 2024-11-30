import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../styles/Login.css';
import FingerPrint from '../../assets/Frame.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const defaultUser = {
        email: 'superadmin@gmail.com',
        password: 'pass123',
    };

    const handleLogin = (e) => {
        e.preventDefault();
    
        if (email === defaultUser.email && password === defaultUser.password) {
            navigate('/dashboard', { state: { success: true } });
        } else {
            Swal.fire('Invalid credentials, please try again.');
        }
    };
    
    return (
        <div className="container">
            <div className="left-pane">
                <h1 className="title">AdoVelopers</h1>
                <p className="subtitle">The best fingerprint locked door.</p>
                <button className="read-more-btn">Read More</button>
            </div>
            <div className="right-pane">
                <div className="login-container">
                    <div className="icon-container">
                        <i className="fas fa-fingerprint fingerprint-icon"></i>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={FingerPrint} alt="Fingerprint" />
                    </div>

                    <h4 className="login-title">Log in to your Account</h4>
                    <p className="login-subtitle">Enter your admin credentials to proceed.</p>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="password-container">
                                <input
                                    id="password"
                                    type="password"
                                    className="form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className="fas fa-eye eye-icon"></i>
                            </div>
                        </div>
                        <div className="form-options">
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkbox-label">Remember me</span>
                            </label>
                            <a href="#" className="forgot-password-link">
                                Forgot Password?
                            </a>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="login-btn">
                                Log in
                            </button>
                        </div>
                        <div className="signup-link">
                            <p>
                                Don't have an account?
                                <Link to="/signup">Sign Up</Link>
                            </p>
                        </div>
                        <div className="admin-login-link">
                            <p>Login as </p><a href="#">Admin</a>
                        </div>
                    </form>
                </div>
            </div>

            <div className='circle-bottom'>

            </div>

            <div className='circle-bottom2'>

            </div>
        </div>
    );
}

export default Login;
