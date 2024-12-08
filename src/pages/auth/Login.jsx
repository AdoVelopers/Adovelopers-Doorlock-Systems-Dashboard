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
    const [user_id, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [eyeClass, setEyeClass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser } = useUser();

    // Handle success or error messages on component mount
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

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Check if the fields are empty
        if (!user_id || !password) {
            Swal.fire('Error', 'Please fill in both fields.', 'error');
            setLoading(false);
            return;
        }

        const loginData = {
            user_id: user_id,
            password: password,
        };

        try {
            const response = await fetch(`http://54.252.176.21:3030/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                credentials: 'include', // Ensures cookies are sent and received
            });

            const data = await response.json();
            console.log('Response Data:', data);

            if (response.ok && data.message === 'Logged in successfully') {
                // Store the full user object in localStorage
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('role', data.role);

                loginUser(data);

                // Redirect to the dashboard
                navigate('/dashboard', { state: { success: true } });
            }else if(data.statusCode === 'Pending'){
                Swal.fire('Login failed', 'Your account is pending approval. Please contact the administrator.', 'error');
            } else {
                Swal.fire('Login failed', 'Please check your credentials and try again.', 'error');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Swal.fire('Error during login', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };


    // Toggle password visibility
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
                                <label htmlFor="user_id" className="form-label">User ID</label>
                                <div className="input-container">
                                    <IoPersonOutline className="input-icon" />
                                    <input
                                        id="user_id"
                                        type="text"
                                        className="form-input with-icon"
                                        value={user_id}
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder="Enter your user ID"
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
                                <label className="checkbox-login">
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
