import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { format } from 'date-fns';

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function Payments (userInfo){

    const [payments, setPayments] = useState([]);

    const fetchPayments = async ()=>{

    }




    useEffect(
        ()=>{

        }, []
    );

return(
    <div>
        
    </div>
)

}

export default Payments;

