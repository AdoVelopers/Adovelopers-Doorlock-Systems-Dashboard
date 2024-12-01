import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../styles/Login.css';
import FingerPrint from '../../assets/Frame.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoPersonOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useUser } from '../../protectedRoutes/UserContext';
import LoginLoading from './LoginLoading';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [eyeClass, setEyeClass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser } = useUser();

    useEffect(() => {
        if (location.state?.message) {
            Swal.fire({
                title: "Logged Out",
                text: location.state.message,
                icon: "success",
                confirmButtonText: "OK",
            });
        }
    }, [location.state]);

    const defaultUser = {
        email: 'superadmin@gmail.com',
        password: 'pass123',
        role: 'superadmin',
    };

    const defaultAdmin = {
        email: 'admin@gmail.com',
        password: 'adminpass',
        role: 'admin',
    };

    const defaultUserLogin = {
        email: 'user@gmail.com',
        password: 'userpass',
        role: 'user',
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        
        setTimeout(() => {
            if (email === defaultUser.email && password === defaultUser.password) {
                loginUser({ email, role: 'superadmin' });
                localStorage.setItem('loginSuccess', 'true');
                navigate('/dashboard', { state: { success: true } });
            } else if (email === defaultAdmin.email && password === defaultAdmin.password) {
                loginUser({ email, role: 'admin' });
                localStorage.setItem('loginSuccess', 'true');
                navigate('/dashboard', { state: { success: true } }); 
            } else if (email === defaultUserLogin.email && password === defaultUserLogin.password) {
                loginUser({ email, role: 'user' });
                localStorage.setItem('loginSuccess', 'true');
                navigate('/dashboard', { state: { success: true } }); 
            } else {
                Swal.fire('Invalid credentials, please try again.');
                setLoading(false);
            }
        }, 2000); 
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setEyeClass('bounce');
        setTimeout(() => setEyeClass(''), 500);
    };

    return (
        <div className="container">
            <div className="left-pane">
                <h1 className="title">AdoVelopers</h1>
                <p className="subtitle">The best fingerprint locked door.</p>
                <button className="read-more-btn">Read More</button>
            </div>
            <div className="right-pane">
                {loading ? (
                    <LoginLoading name="Karl Bernaldez" />
                ) : (
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
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <div className="input-container">
                                    <IoPersonOutline className="input-icon" />
                                    <input
                                        id="email"
                                        type="email"
                                        className="form-input with-icon"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-container">
                                    <MdLockOutline className="input-icon" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-input with-icon"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                    <span
                                        className={`eye-icon ${eyeClass}`}
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <div className="form-options">
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkbox-label">Remember me</span>
                                </label>
                                <a href="#" className="forgot-password-link">Forgot Password?</a>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="login-btn">Log in</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className='circle-bottom'></div>
            <div className='circle-bottom2'></div>
        </div>
    );
}

export default Login;
