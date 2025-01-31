import { useEffect, useState } from "react";
import "./ManageEvents.css";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function ManageEvents(){
    const[events,setEvents]=useState([]);

    useEffect(()=>{
        axios.get(`${baseUrl}/fetch-events`) 
        .then(response=>{
            console.log(response.data);
            if(Array.isArray(response.data)){
                setEvents(response.data);
            }else{
                console.error("Invalid API response:Expected an array, got",response.data);
                setEvents([]);
            }
        })
        .catch(error=>{
            console.error("Error fetching events:",error);
            setEvents([]);
        });
    },[]);

    const updateEventStatus = async (eventId, status) => {
        try {
            const response = await axios.put(`${baseUrl}/event-status`, { event_id: eventId, status });
            alert(response.data.message);
            setEvents(events.map(event => 
                event.event_id === eventId ? { ...event, status } : event
            ));
        } catch (error) {
            console.error("Error updating event status:", error);
        }
    };

    return(
        <div className="manage-events">
            <h2>Manage Events</h2>
            <table>
                <thead>
                    <tr>
                        <th>Client ID:</th>
                        <th>Event title:</th>
                        <th>Event date:</th>
                        <th>Event Duration:</th>
                        <th>Venue ID:</th>
                        <th>Attendance Number:</th>
                        <th>Person per table:</th>
                        <th>Number of tables:</th>
                        <th>Cuisine ID:</th>
                        <th>Status:</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event =>(
                        <tr key={event.id}>
                            <td>{event.user_id}</td>
                            <td>{event.event_title}</td>
                            <td>{event.event_date}</td>
                            <td>{event.duration}</td>
                            <td>{event.venue_id}</td>
                            <td>{event.attendance_number}</td>
                            <td>{event.persons_per_table}</td>
                            <td>{event.number_of_tables}</td>
                            <td>{event.cuisine_id}</td>
                            <td>{event.status}</td>
                            <td>{event.status==="Pending Approval" &&(
                                <>
                                <button className="accept" onClick={()=>updateEventStatus(event.id,'accepted')}>Accept</button>
                                <button className="deny" onClick={()=>updateEventStatus(event.id,'denied')}>Deny</button>
                                </>
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ManageEvents;