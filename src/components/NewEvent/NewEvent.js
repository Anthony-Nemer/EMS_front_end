import { useState } from "react";
import "./NewEvent.css"

function NewEvent (userInfo) {
    const [eventTitle, setEventTitle]= useState('');

    return(
        <>
        <form>
            <label>Event Title: 
                <input  value={eventTitle} type="text" onChange={(e) =>setEventTitle(e.target.value)} required/>
            </label>
            <label>Date:
                <input type="date" required/>
            </label>
            <label>From:
                <input type="time" required/>
            </label>
            <label>To:
                <input type="time" required/>
            </label>
            <label>Venue:
                <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </label>
            <label>Attendance Number:
                <input type="number" required/>
            </label>
            <label>Number of tables:
                <input type="number" required></input>
            </label>
            <label>Cuisine:
                <select>
                    <option>Cuisine 1</option>
                    <option>Cuisine 2</option>
                </select>
            </label>

           {/*Radio for services then selects for customization */}
        </form>
        </>
    );


}

export default NewEvent;