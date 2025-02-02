import { useNavigate } from 'react-router-dom';
import './DashBoard.css';

const DashBoard=({id, fullName, email, mobile, isSupplier, isHost})=>{
    const navigate=useNavigate();
    const manageEventButton=()=>{
        navigate("/manage-events");
    }
    return(
        <div className="dashboard">
            <div className="getstarted">
                <h4 className="getstarted-text">Manage your bookings and client/supplier interactions easily!</h4>
                <button onClick={manageEventButton}>Manage Events</button>
            </div>
            
        </div>
    );
}

export default DashBoard;