import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/login';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import { ClientNav, HostNav, SupplierNav } from './components/NavBar/NavBar';
import NewEvent from './components/NewEvent/NewEvent';





function App() {
  const [userInfo, setUserInfo]=useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSupplier, setIsSupplier] = useState(false);
  const [isHost, setIsHost] = useState(false);


  const handleLoginSuccess = (userInfo, id, fullName, email, mobile, isSupplier, isHost) => {
    setUserInfo(userInfo);
    setId(id);
    setFullName(fullName);
    setEmail(email);
    setMobile(mobile);
    setIsSupplier(isSupplier);
    setIsHost(isHost);
    setLoggedIn(true);
    console.log('HOST: ', isHost);
  };

  const handleLogout = () => {
    setTimeout(() => {
      setLoggedIn(false);
      window.location.href = "/";
    }, 300);
  };

  const renderNavBar = () => {
    if (isSupplier) return <SupplierNav fullName={fullName} handleLogout={handleLogout} />;
    if (isHost) return <HostNav fullName={fullName} handleLogout={handleLogout} />;
    return <ClientNav fullName={fullName} handleLogout={handleLogout} />;
  };

  return (
    <Router>
      <div className="App">
        {loggedIn && renderNavBar()}
        <Routes>
          <Route
            path="/"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/homepage"
            element={
              loggedIn ? (
                <HomePage
                  id={id}
                  fullName={fullName}
                  email={email}
                  mobile={mobile}
                  isSupplier={isSupplier}
                  isHost={isHost}
                  loggedIn={loggedIn}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path='/new-event'
            element={<NewEvent  userInfo={userInfo}/>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
