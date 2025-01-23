import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './login.css';
import logo from "../../assets/PlanPerfect.png"

const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isInitialLogin, setIsInitialLogin] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await Axios.post(`${baseUrl}/login`, { email, password });    
            setError('');     
            const { userInfo, id, fullName, email: responseEmail, mobile, isSupplier, isHost } = res.data;  
            onLoginSuccess(userInfo, id, fullName, email, mobile, isSupplier, userInfo.isHost);
            navigate('/homepage');
    
        } catch (err) {
            console.error('Error: ', err);
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    
    
    const handleRegisterNav = () => {
        navigate("/register");
    };

    useEffect(() => {
        if (email) {
            const handler = setTimeout(() => {
                checkIfInitialLogin();
            }, 1600);

            return () => {
                clearTimeout(handler);
            };
        }
    }, [email]);

    const checkIfInitialLogin = async () => {
        try {
            const res = await Axios.get(`${baseUrl}/initial/login/${email}`);
            const { email_exists } = res.data;
            if (!email_exists) {
                setError("Email does not exist");
                setIsInitialLogin(true);
            } else {
                setIsInitialLogin(false);
                setError('');
            }
        } catch (err) {
            setError("Failed to check email existence. Please try again.");
            console.error("Error checking email:", err);
        }
    };
    

    return (
        <div className="login-container">
            <div className='scale-text'>
                <h2>Plan</h2>  
                <h2>Organize</h2> 
                <h2>&Manage events seamlessly!</h2> 
            </div>
            <div className="login-form">
                <img src={logo} alt="Plan Perfect Logo" className="login-logo"></img>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isInitialLogin}
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <span className='register-btn' onClick={handleRegisterNav}>Register</span>
                    <button type="submit" disabled={!email || !password || isInitialLogin}>Login</button>
                </form>
            </div>
        </div>  
    );
};

export default Login;
