import React from "react";
import "./NavBar.css";

export const ClientNav = ({ fullName, handleLogout }) => (
  <nav className="navbar">
    <ul>
      <li>Welcome, {fullName}</li>
      <li>Home</li>
      <li>Book Event</li>
      <li>My Payments</li>
      <li>Feedback</li>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  </nav>
);

export const HostNav = ({ fullName, handleLogout }) => (
  <nav className="navbar">
    <ul>
      <li>Welcome, {fullName}</li>
      <li>Home</li>
      <li>Create Event</li>
      <li>Manage Events</li>
      <li>Venue Bookings</li>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  </nav>
);

export const SupplierNav = ({ fullName, handleLogout }) => (
  <nav className="navbar">
    <ul>
      <li>Welcome, {fullName}</li>
      <li>Home</li>
      <li>My Services</li>
      <li>Add Service</li>
      <li>Feedback</li>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  </nav>
);
