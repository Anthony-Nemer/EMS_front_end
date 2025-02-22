import React from "react";
import "./NavBar.css"; 
import { useNavigate } from "react-router-dom";

export const ClientNav = ({ fullName, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => navigate("/homepage")}>Home</li>
        <li onClick={() => navigate("/new-event")}>Book Event</li>
        <li onClick={() => navigate("/ongoing-events")}>Ongoing Events</li>
        <li onClick={() => navigate("/feedback")}>Feedback </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export const HostNav = ({ fullName, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => navigate("/dashboard")}>Home</li>
        <li onClick={()=>navigate("/manage-events")}>Manage Events</li>
        <li onClick={()=>navigate("/add-venue")}>Venues</li>
        <li onClick={()=>navigate("/add-cuisine")}>Cusisines</li>
        <li onClick={()=>navigate("/restock-cuisine")}>Restock Cuisine</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export const SupplierNav = ({ fullName, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => navigate("/homepage")}>Home</li>
        <li>Services</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};
