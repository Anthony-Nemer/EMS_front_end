import React, { use, useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate , useNavigate} from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/login';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage';

const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

function App() {
  const [loggedIn , setLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSupplier, setIsSupplier] = useState(null)
  const [isHost, setIsHost] = useState(null)


  const handleLoginSuccess = (id, fullName, email, mobile, isSupplier, isHost) => {
      setId(id);
      setFullName(fullName);
      setEmail(email);
      setMobile(mobile);
      setIsSupplier(isSupplier);
      setIsHost(isHost);
      setLoggedIn(true);
    }


  const handleLogout = () => {
    setTimeout(() => {
        setLoggedIn(false);
        window.location.href = "/";
    }, 300)
};


  return (
    <Router>
      <div className="App">
      {(loggedIn) && <NavBar fullName={fullName} handleLogout={handleLogout} />}
          <Routes>
            <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess}/>} 
            />
            <Route path="/register" element={<RegisterPage/>}
            />
            <Route path="/homepage" element={<HomePage id={id} fullName={fullName} email={email} mobile={mobile} isSupplier={isSupplier} isHost={isHost} loggedIn={loggedIn}/>}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
