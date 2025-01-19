import React from 'react';
import './NavBar.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ fullName, handleLogout }) => {
    const navigate = useNavigate();
    


    return (
        <div id="nav-bar">
            <div className="nav__bar--end">
                <p className="nav__bar--username">{fullName}</p>
                <Button size="small" variant="contained" onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default NavBar;