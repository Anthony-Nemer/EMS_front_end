import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewEvent.css";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function NewEvent({ userInfo }) {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState("");
  const [venue, setVenue] = useState("");
  const [attendanceNumber, setAttendanceNumber] = useState(0);
  const [personsPerTable, setPersonsPerTable] = useState(0);
  const [tableNumber, setTableNumber] = useState(0);
  const [cuisine, setCuisine] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [venues, setVenues] = useState([]);
  const [venueError, setVenueError] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);


  const navigate = useNavigate();

  const handleAttendanceChange = (e) => {
    const value = Number(e.target.value);
    setAttendanceNumber(value);
  };
  

  const handleTableNumberChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setPersonsPerTable(value);
  };

  const calculateTables = () => {
    if (attendanceNumber > 0 && personsPerTable > 0) {
      return Math.ceil(attendanceNumber / personsPerTable);
    }
    return 0;
  };

  const fetchCuisines = async () => {
    try {
      const response = await axios.get(`${baseUrl}/fetch-cuisines`);
      setCuisines(response.data);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
    }
  };
  
  
  const fetchVenues = async () => {
    try {
      const response = await axios.get(`${baseUrl}/fetch-venues`);
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };
  
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${baseUrl}/fetch-services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  

  const handleSelectVenue = (e) => {
    const selectedVenueId = e.target.value;
    setVenue(selectedVenueId);
    setVenueError("");

    const selectedVenue = venues.find((v) => v.id.toString() === selectedVenueId);

    if (selectedVenue && attendanceNumber > selectedVenue.capacity) {
      setAttendanceNumber(selectedVenue.capacity);
      setVenueError(
        `The selected venue (${selectedVenue.name}) has a maximum capacity of ${selectedVenue.capacity}. Attendance number adjusted.`
      );
    }
  };

  const handleCheckboxChange = (e) => {
    const serviceId = Number(e.target.value);
    const isChecked = e.target.checked;
  
  
    setSelectedServices((prevSelectedServices) => {
      let updatedServices;
      if (isChecked) {
        updatedServices = [...prevSelectedServices, serviceId]; 
      } else {
        updatedServices = prevSelectedServices.filter((id) => id !== serviceId); 
      }
  
      return updatedServices;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCuisine = cuisines.find((c) => c.id === Number(cuisine));
    const cuisinePrice = selectedCuisine ? selectedCuisine.price : 0;
    const selectedVenue = venues.find((v) => v.id === Number(venue));
    const venuePrice = selectedVenue ? selectedVenue.price : 0;
    const selectedServicesPrice = calculateSelectedServicesPrice();
    const validAttendanceNumber = Math.max(0, attendanceNumber);
    const calculatedTableNumber = tableNumber > 0 ? tableNumber : calculateTables();
    const tablesPrice = calculatedTableNumber * 20; 
    const cateringTotal = validAttendanceNumber * cuisinePrice;
    const total = cateringTotal + tablesPrice + venuePrice + selectedServicesPrice;

    if (!isNaN(total)) {
      setTotalPrice(total);
    } else {
      setTotalPrice(0); 
    }
  };
  


  const calculateSelectedServicesPrice = () => {
    let selectedServicesPrice = 0;
  
    selectedServices.forEach((serviceId) => {
      const service = services.find((s) => s.id === serviceId);
  
      if (service) {
        const servicePrice = parseFloat(service.price) || 0; 
        selectedServicesPrice += servicePrice;
      }
    });
  
    return selectedServicesPrice;
  };
  
  
  const handleBookEvent = async (e) => {
    e.preventDefault();  // Prevent page reload
  
    const eventData = {
      user_id: userInfo.id, 
      event_title: eventTitle,
      event_date: eventDate,
      duration: duration,
      venue_id: venue,
      attendance_number: attendanceNumber,
      persons_per_table: personsPerTable,
      number_of_tables: tableNumber,
      cuisine_id: cuisine,
      services: selectedServices 
    };
  
    try {
      const response = await axios.post(`${baseUrl}/book-event`, eventData);
      
      if (response.status === 200) {
        console.log("Event booked successfully:", response.data);
  
        setEventTitle("");
        setEventDate("");
        setDuration("");
        setVenue("");
        setAttendanceNumber(0);
        setPersonsPerTable(0);
        setTableNumber(0);
        setCuisine("");
        setSelectedServices([]);
        setTotalPrice(null);
  
        navigate("/homepage");  
      } else {
        console.error("Failed to book event:", response.data);
      }
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };
  
  

  useEffect(() => {
    fetchCuisines();
    fetchVenues();
    fetchServices();
  }, [attendanceNumber, personsPerTable]);

  useEffect(() => {
    const calculatedTables = calculateTables();
    setTableNumber(calculatedTables);
  }, [attendanceNumber, personsPerTable]);




  return (
    <div className="new-event">
      <form onSubmit={handleBookEvent}>
        <label>
          Event Title:
          <input
            value={eventTitle}
            type="text"
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </label>
        <label>
          Duration:
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Select Duration</option>
            <option>Day (11 PM till 6 PM)</option>
            <option>Night (7 PM till 2 AM)</option>
          </select>
        </label>
        <label>
          Attendance Number:
          <input
            type="number"
            value={attendanceNumber}
            onChange={handleAttendanceChange}
            required
          />
        </label>
        <label>
          Persons per table:
          <input
            type="number"
            value={personsPerTable}
            onChange={handleTableNumberChange}
            required
          />
        </label>
        <label>
          Number of tables:
          <input
            type="number"
            value={tableNumber}
            readOnly
            disabled
          />
        </label>
        <label>
          Venue:
          <select value={venue} onChange={handleSelectVenue}>
            <option value="">Select a Venue</option>
            {venues.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} - Capacity: {v.capacity}
              </option>
            ))}
          </select>
          {venueError && <p className="error-message">{venueError}</p>}
        </label>
        <label>
          Cuisine:
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} required>
            <option value="">Select a Cuisine</option>
            {cuisines.map((c) => (
                <option key={c.id} value={c.id}>
                {c.cuisine} (${c.price} per person)
                </option>
            ))}
            </select>
          <p>
            <i>*Price will be calculated at Checkout</i>
          </p>
        </label>

        <label>Services:</label>
        <div>
          {services.map((service) => (
            <div key={service.id} className="service-checkbox">
              <input
                type="checkbox"
                value={service.id}
                onChange={handleCheckboxChange}
                checked={selectedServices.includes(service.id)}
              />
              <label>
                {service.service_name}
              </label>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}>Request Price</button>
        {totalPrice !== null && (
            <div className="total-price">
            <h3>Total Price: {totalPrice}$</h3>
            <button className="book-event-button" type="submit">Book Event</button>
            </div>
        )}
      </form>

    </div>
  );
}

export default NewEvent;
