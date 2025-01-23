import { useState } from "react";
import "./NewEvent.css";

function NewEvent(userInfo) {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState("Day (11 PM till 6 PM)");
  const [venue, setVenue] = useState("Option 1");
  const [attendanceNumber, setAttendanceNumber] = useState(0);
  const [tableNumber, setTableNumber] = useState(0);
  const [cuisine, setCuisine] = useState("Cuisine 1");

  const handleAttendanceChange = (e) => {
    const value = Math.max(0, e.target.value); // Ensure non-negative value
    setAttendanceNumber(value);
  };

  const handleTableNumberChange = (e) => {
    const value = Math.max(0, e.target.value); // Ensure non-negative value
    setTableNumber(value);
  };

  return (
    <div className="new-event">
      <form>
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
            <option>Day (11 PM till 6 PM)</option>
            <option>Night (7 PM till 2 AM)</option>
          </select>
        </label>
        <label>
          Venue:
          <select
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          >
            <option>Option 1</option>
            <option>Option 2</option>
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
          Number of tables:
          <input
            type="number"
            value={tableNumber}
            onChange={handleTableNumberChange}
            required
          ></input>
        </label>
        <label>
          Cuisine:
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option>Cuisine 1</option>
            <option>Cuisine 2</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default NewEvent;
