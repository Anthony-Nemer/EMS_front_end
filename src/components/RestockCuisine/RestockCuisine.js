import { useState, useEffect } from "react";
import axios from "axios";
import "./RestockCuisine.css"; 

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function RestockCuisine({ userId }) {
    const [cuisines, setCuisines] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const [items, setItems] = useState([{ name: "", quantity: 0 }]);

    useEffect(() => {
        axios.get(`${baseUrl}/fetch-cuisines`)
            .then(response => setCuisines(response.data))
            .catch(error => console.error("Error fetching cuisines:", error));
    }, []);

    const handleRequest = () => {
        axios.post(`${baseUrl}/restock-request`, {
            host_id: userId,
            cuisine_id: selectedCuisine,
            items
        })
        .then(response => alert(response.data.message)) 
        .catch(error => {
            if (error.response && error.response.status === 404) {
                alert(error.response.data.message); 
            } else {
                console.error("Error sending restock request:", error);
            }
        });
    };

    return (
        <div className="restock-container">
            <h2>Restock Cuisine</h2>
            <select className="cuisine-select" onChange={e => setSelectedCuisine(e.target.value)}>
                <option value="">Select Cuisine</option>
                {cuisines.map(cuisine => (
                    <option key={cuisine.id} value={cuisine.id}>{cuisine.cuisine}</option>
                ))}
            </select>
            
            <div className="item-list">
                {items.map((item, index) => (
                    <div className="item" key={index}>
                        <input 
                            type="text" 
                            placeholder="Item name" 
                            value={item.name} 
                            onChange={e => {
                                const newItems = [...items];
                                newItems[index].name = e.target.value;
                                setItems(newItems);
                            }} 
                        />
                        <input 
                            type="number" 
                            placeholder="Quantity" 
                            value={item.quantity} 
                            onChange={e => {
                                const newItems = [...items];
                                newItems[index].quantity = e.target.value;
                                setItems(newItems);
                            }} 
                        />
                    </div>
                ))}
                <button className="add-item-btn" onClick={() => setItems([...items, { name: "", quantity: 0 }])}>
                    Add More Items
                </button>
            </div>

            <button className="send-request-btn" onClick={handleRequest}>Send Restock Request</button>
        </div>
    );
}

export default RestockCuisine;