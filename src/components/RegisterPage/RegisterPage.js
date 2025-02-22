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
    const [cuisines, setCuisinies] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [employeePin, setEmployeePin] = useState('');
    const [error, setError] = useState('');


    const fetchCuisines = async () => {
        try {
            const response = await Axios.get(`${baseUrl}/fetch-cuisines`);
            setCuisinies(response.data);
        } catch (error) {
            console.error('Error fetching cuisines:', error);
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
        let cuisineData = null;
        let employeePinData = null;
    
        if (userRole === 'supplier') {
            cuisineData = selectedCuisine; 
        } else if (userRole === 'host') {
            employeePinData = employeePin;  
        }
        console.log("Selected Cuisine:", selectedCuisine);
        const req = {
            fullName : newFullName,
            email: newEmail,
            password: newPassword,
            mobile : newPhoneNumber,
            role : userRole,
            cuisineId : cuisineData,
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
        fetchCuisines();

    }, [])

    const handlePhoneChange = (value) => {
        setNewPhoneNumber(value);
    };
    const handleRoleChange = (e) => {
        setUserRole(e.target.value); 
    };
    const handleCuisineChange = (e) => {
        setSelectedCuisine(e.target.value);
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
                    <button className='back-btn' onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                    </button>
                    <h2>Register</h2>           

                    <label>Full Name: 
                        <input type='text' onChange={(e) => setNewFullName(e.target.value)} required/>
                    </label>
                    <label>Email Address: 
                        <input type='text' onChange={(e) => setNewEmail(e.target.value)} required autoComplete="off" />
                    </label>
                    <label>Password: 
                        <input type='password' onChange={(e) => setNewPassword(e.target.value)} required autoComplete="off"/>
                    </label>
                    <label>Confirm Password: 
                        <input type='password' onChange={(e) => setVerifyPassword(e.target.value)} required autoComplete="off"/>
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
                        <label htmlFor="service-select">Select a Cuisine:</label>
                        <select
                            id="service-select"
                            value={selectedCuisine}
                            onChange={handleCuisineChange}
                            required={userRole === 'supplier'}
                        >
                            <option value="">-- Select a Cuisine --</option>
                            {cuisines.map((cuisine) => (
                                <option key={cuisine.id} value={cuisine.id}>
                                    {cuisine.cuisine}
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