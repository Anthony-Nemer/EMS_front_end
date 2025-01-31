import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './ContactSupplier.css';

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
function ContactSupplier(){
 const[suppliers,setSuppliers]=useState([]);

 useEffect(()=>{
    axios.get(`${baseUrl}/fetch-suppliers`)
    .then(response=>{
        setSuppliers(response.data);
    }) 
    .catch(error=>{
        console.error("Error fetching suppliers:",error);
    });
 },[]);

 return(
    <div className="supplier-list">
        <h2>Available Suppliers</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Service ID</th>
                    <th>Service Type:</th>
                    <th>Service Price:</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map(supplier=>(
                    <tr key={supplier.id}>
                        <td>{supplier.fullname}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.mobilenumber}</td>
                        <td>{supplier.serviceId}</td>
                        <td>{supplier.service_name}</td>
                        <td>{supplier.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
 );
}
export default ContactSupplier;