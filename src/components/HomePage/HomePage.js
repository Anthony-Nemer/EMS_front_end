import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { Button, Menu, MenuItem } from '@mui/material';

const HomePage = ({id, fullName, email, mobile, isSupplier, isHost, loggedIn }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        handleMenuClose();
        navigate(path);
    };

    return (
        <div className="blank-page">
            <Button
                variant="contained"
                onClick={handleMenuClick}
                className="menu-button"
            >
                Menu
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleNavigate('/test1')}>Test1</MenuItem>
                <MenuItem onClick={() => handleNavigate('/test2')}>Test2</MenuItem>
                
                    
                
            </Menu>
            <div className='test'>
            </div>
        </div>

    );
};

export default HomePage;


