import React from 'react';
import './HomePage.css';

const HomePage = ({ id, fullName, email, mobile, isSupplier, isHost }) => {
  return (
    <div className="homepage">
      <h1>Welcome, {fullName}!</h1>
      {isSupplier && <p>You are logged in as a <strong>Supplier</strong>.</p>}
      {isHost && <p>You are logged in as a <strong>Host</strong>.</p>}
      {!isSupplier && !isHost && <p>You are logged in as a <strong>Client</strong>.</p>}

    </div>
  );
};

export default HomePage;
