import React from 'react';
import './HomePage.css';

const HomePage = ({ id, fullName, email, mobile, isSupplier, isHost }) => {
  return (
    <div className="homepage">

            <div className='move-text'>
                <h2>Plan</h2>  
                <h2>Organize</h2> 
                <h2>&Manage events seamlessly!</h2> 
            </div>
    </div>
  );
};

export default HomePage;
