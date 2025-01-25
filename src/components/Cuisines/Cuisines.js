import axios from "axios";
import { useState } from "react";
import './Cuisines.css';

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function Cuisines() {
  const [cuisines, setCuisines] = useState([]); 
  const [cuisineError, setCuisineError] = useState("");
  const [isVisible, setIsVisible] = useState(false); 

  const fetchCuisine = async () => {
    try {
      const response = await axios.get(`${baseUrl}/fetch-cuisines`);
      setCuisines(response.data); 
      setCuisineError(""); 
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      setCuisineError("Failed to fetch cuisines. Please try again.");
    }
  };

  const handleExploreClick = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      fetchCuisine();
    }
  };

  return (
    <div className="cuisine">
      <h2>Our Cuisines</h2>
      <button onClick={handleExploreClick}>{isVisible ? "Hide" : "Explore"}</button> 
      
      {cuisineError && <p style={{ color: "red" }}>{cuisineError}</p>}
      <ul className={`cuisine-list ${isVisible ? "visible" : "hidden"}`}>
        {cuisines.map((cuisine, index) => (
          <li key={index} className="flex-item">
            <strong>{cuisine.cuisine}</strong>
            <p>Price: ${cuisine.price} per person</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cuisines;
