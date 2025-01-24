import axios from "axios";
import { useState } from "react";
import "./Venue.css"

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function Venue() {
  const [venues, setVenues] = useState([]); 
  const [venueError, setVenueError] = useState(""); 
  const[isVisible, setIsVisible]=useState(false);

  const fetchVenue = async () => {
    try {
      const response = await axios.get(`${baseUrl}/fetch-venues`);
      setVenues(response.data);
      console.log(venues); 
      setVenueError(""); 
    } catch (error) {
      console.error("Error fetching venues:", error);
      setVenueError("Failed to fetch venues. Please try again.");
    }
  };

  const handleExploreClick=()=>{
    setIsVisible(!isVisible);
    if(!isVisible){
      fetchVenue();
    }
  }

  return (
    <div className="venue">
      <h2>Our Venues</h2>
      <button onClick={handleExploreClick}>{isVisible ?"Hide":'Explore'}</button> 
      
      {venueError && <p style={{ color: "red" }}>{venueError}</p>} 
      {isVisible && (
      <ul style={{marginRight:"140px"}}>
        {venues.map((v) => (
          <li key={v.id}>
            <strong>{v.name}</strong>
            <p>Address: {v.address}</p>
            <p>Capacity: {v.capacity}</p>
            <p>Price: ${v.price}</p>
            <img src={v.photo} alt={v.name} width="150" /> 
          </li>
        ))}
      </ul>
  )}:
    </div>
  );
}

export default Venue;
