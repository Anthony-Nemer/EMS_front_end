import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ id, fullName, email, mobile, isSupplier, isHost }) => {
  const navigate= useNavigate();
  const handleButtonClick=()=>{
    navigate("/new-event");
  }
  return (
    <div>
    <div className="homepage">
            <div className='move-text'>
                {/* <h2>Plan</h2>  
                <h2>Organize</h2> 
                <h2>&Manage events seamlessly!</h2>  */}
                <h2>Plan, Organize &Manage events seamlessly!</h2>
            </div>
            <div className="desc-homepage">
              <h4>PlanPerfect: Your ultimate solution to effortlessly book venues, explore cuisines, and organize memorable events.</h4>
              <button onClick={handleButtonClick}>Get Started</button>
            </div>
    </div>
    <div className="us">
            <div className="container">
                <h3>Quality</h3>
                <br/>
                <p>PlanPerfect delivers high-quality event planning with premium venues, catering, and services. Every detail is handled with care to ensure flawless execution.</p>
            </div>
            <div className="container">
                <h3>Simplicity</h3>
                <br/>
                <p>PlanPerfect simplifies event planning with an easy-to-use platform for booking venues and services. Plan your event in just a few clicks.</p>
            </div>
            <div className="container">
                <h3>Customization</h3>
                <br/>
                <p>PlanPerfect allows you to customize every detail of your event. Tailor menus, themes, and services to create a truly unique experience.</p>
            </div>
        </div>
  </div>
  );
};

export default HomePage;
