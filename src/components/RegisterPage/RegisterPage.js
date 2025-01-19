import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './RegisterPage.css';
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';
import { Password } from '@mui/icons-material';

const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

function RegisterPage() {
    const navigate = useNavigate();
    const [newFullName, setNewFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [userRole, setUserRole] = useState('personal');
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [employeePin, setEmployeePin] = useState('');
    const [error, setError] = useState('');


    const fetchServices = async () => {
        try {
            const response = await Axios.get(`${baseUrl}/fetch-services`);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validPasswords = passwordsMatch();
        const validEmail = emailFormat();
        try{
        if (!validPasswords) {
            setError('Passwords do not match');
            return;
        }
    
        if (!validEmail) {
            setError('Enter a valid email address');
            return;
        }
        let serviceData = null;
        let employeePinData = null;
    
        if (userRole === 'supplier') {
            serviceData = selectedService;  // Service should be set if role is supplier
        } else if (userRole === 'host') {
            employeePinData = employeePin;  // Employee PIN should be set if role is host
        }
        const req = {
            fullName : newFullName,
            email: newEmail,
            password: newPassword,
            mobile : newPhoneNumber,
            role : userRole,
            service : serviceData,
            employeePin : employeePinData
        }
        setError('');
        const res = await Axios.post(`${baseUrl}/register`, req);
        console.log('Register response: ', res.data);
        const userInfo = res.data;
        console.log('Register response:', userInfo);
        navigate('/')

    }catch(err){
        setError(err.response?.data?.message || 'Register failed');
    }

    }

    const passwordsMatch = () => {
        return (newPassword === verifyPassword);
    }

    const emailFormat = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(newEmail);
    }

    useEffect(() => {
        fetchServices();

    }, [])

    const handlePhoneChange = (value) => {
        setNewPhoneNumber(value);
    };
    const handleRoleChange = (e) => {
        setUserRole(e.target.value); 
    };
    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };


    return(
        
        <div className='register-page'>
             <div className='scale-text'>
               <h2>Plan</h2>  
                <h2>Organize</h2> 
                <h2>&Manage events seamlessly!</h2> 
            </div>
            <div className='register-container'>
                <form className='register-form' onSubmit={handleRegister}>
                    <h2>Register</h2>           
                    <button className='back-btn'>
                    <svg onClick={(e) => navigate('/')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                    </button>
                    <label>Full Name: 
                        <input type='text' onChange={(e) => setNewFullName(e.target.value)} required/>
                    </label>
                    <label>Email Address: 
                        <input type='text' onChange={(e) => setNewEmail(e.target.value)} required/>
                    </label>
                    <label>Password: 
                        <input type='password' onChange={(e) => setNewPassword(e.target.value)} required/>
                    </label>
                    <label>Confirm Password: 
                        <input type='password' onChange={(e) => setVerifyPassword(e.target.value)} required/>
                    </label>
                    <label>Mobile Number:
                        <PhoneInput
                            international
                            country="LB"  
                            value={newPhoneNumber}
                            onChange={handlePhoneChange} 
                            required 
                        />
                    </label>
                    <label>User Role:
                        <div className="radio-buttons">
                            <label className="radio-button">
                            <input type="radio" 
                                id="personal" 
                                name="role" 
                                value="personal" 
                                checked={userRole === 'personal'} 
                                onChange={handleRoleChange} />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Personal Use</span>
                            </label>
                            <label className="radio-button">
                            <input 
                                type="radio" 
                                id="host" 
                                name="role" 
                                value="host" 
                                checked={userRole === 'host'} 
                                onChange={handleRoleChange} />
                            <div className="radio-circle"></div>
                            <span className="radio-label">Host</span>
                            </label>
                            <label className="radio-button">
                            <input 
                                type="radio" 
                                id="supplier" 
                                name="role" 
                                value="supplier" 
                                checked={userRole === 'supplier'} 
                                onChange={handleRoleChange}/>
                            <div className="radio-circle"></div>
                            <span className="radio-label">Supplier</span>
                            </label>
                        </div>
                    </label>

                    {userRole === 'supplier' &&
                    <div>
                        <label htmlFor="service-select">Select a Service:</label>
                        <select
                            id="service-select"
                            value={selectedService}
                            onChange={handleServiceChange}
                            required={userRole === 'supplier'}
                        >
                            <option value="">-- Select a Service --</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.service_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    }
                    {userRole === 'host' &&
                    <div>
                        <label htmlFor="employee-pin">Enter Employee PIN:</label>
                        <input
                            type="text"
                            id="employee-pin"
                            value={employeePin}
                            onChange={(e) => setEmployeePin(e.target.value)}
                            placeholder="Enter your PIN"
                            required={userRole === 'host'}
                        />
                    </div>
                    }
                    {error && <div className="error">{error}</div>}
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>



    );

}

export default RegisterPage