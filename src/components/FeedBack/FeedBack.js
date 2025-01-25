import { useState } from 'react';
import './FeedBack.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function FeedBack(userInfo) {
    const[feedback,setFeedback]=useState("");
    const[rating,setRating]=useState("");
    const[services,setServices]=useState("");
    const[suggestions,setSuggestions]=useState("");

    const navigate = useNavigate();

    const handleResetButton=()=>{
        setFeedback("");
        setRating("");
        setServices("");
        setSuggestions("");
    }

    const handleSubmitButton = async (e) => {
        e.preventDefault();  // Prevent page reload
      
        const feedbackData = {
          user_id: userInfo.id, 
          feedback,
          rating,
          services,
          suggestions
        };
      
        try {
          const response = await axios.post(`${baseUrl}/feedback`, feedbackData);
          
          if (response.status === 200) {
            alert("Feedback submitted successfully");
      
            setFeedback("");
            setRating("");
            setServices("");
            setSuggestions("");
      
            navigate("/homepage");  
          } else {
            console.error("Error submitting feedback:", response.data);
          }
        } catch (error) {
          alert("There was an error submitting your feedback.Please try again.")
        }
      };
    return (
        <div className="feedback-form">
            <fieldset>
            <form>
             <div> <h2>We value your feedback!</h2> </div>
             <br/>
             <h4>Your feedback:</h4>
                <textarea 
                  value={feedback} 
                  onChange={(e)=>
                  setFeedback(e.target.value)
                  }
                  placeholder="Write your feedback here..."
                  rows="5" 
                  cols="70"></textarea>
                <h4>Rate your experience:</h4>
                    <input 
                      type="radio" 
                      name="rating" 
                      value="1"
                      onChange={(e)=>
                        setRating(e.target.value)
                      }/>1
                    <input 
                      type="radio" 
                      name="rating" 
                      value="2"
                      onChange={(e)=>
                        setRating(e.target.value)
                      }/>2
                    <input 
                      type="radio" 
                      name="rating" 
                      value="3"
                      onChange={(e)=>
                        setRating(e.currentTarget.value)
                      }/>3
                    <input 
                      type="radio" 
                      name="rating" 
                      value="4"
                      onChange={(e)=>
                        setRating(e.target.value)
                      }/>4
                    <input 
                      type="radio" 
                      name="rating" 
                      value="5"
                      onChange={(e)=>
                        setRating(e.target.value)
                      }/>5
                <h4>How satistfied are you with our services?</h4>
                <select
                  value={services}
                  onChange={(e)=>
                    setServices(e.target.value)
                  }>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="bad">Bad</option>
                </select>
                <h4>Your suggestions:</h4>
                <textarea
                  value={suggestions} 
                  placeholder="Provide your suggestions here..." 
                  onChange={(e)=>
                  setSuggestions(e.target.value)
                  }
                  rows="5" 
                  cols="70"></textarea>
                <div className="buttons">
                <button type="reset" value="reset" onClick={()=>handleResetButton}>Reset</button>
                <button type="submit" value="submit" onClick={()=>handleSubmitButton}>Submit</button>
                </div>
            </form>
            </fieldset>
        </div>
    );
}

export default FeedBack;