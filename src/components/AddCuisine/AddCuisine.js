import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import "./AddCuisine.css";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const AddCuisine=()=>{
    const[cuisines,setCuisines]=useState();
    const[open,setOpen]=useState(false);
    const[newCuisine, setNewCuisine]=useState({
        cuisine:"",
        price:"",
    });

    useEffect(()=>{
        axios.get(`${baseUrl}/fetch-cuisines`) 
        .then(response=>{
            if(Array.isArray(response.data)){
                setCuisines(response.data);
            }else{
                console.error("Invalid API response:Expected an array, got",response.data);
                setCuisines([]);
            }
        })
        .catch(error=>{
            console.error("Error fetching cuisines:",error);
            setCuisines([]);
        });
    },[]);

    const handleChange=(e)=>{
        setNewCuisine({...newCuisine,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const cuisineData={
            cuisine: newCuisine.cuisine,
            price: newCuisine.price,
      };

      console.log("Sending cuisine data:", cuisineData);

      try{
        const response= await axios.post(`${baseUrl}/new-cuisine`, cuisineData);
        if(response.status==200){
            alert("Cuisine added successfully");
            setCuisines([...cuisines,{cuisineData, id:response.data.id}]);
            setOpen(false);
        }else{
            console.error("Error adding cuisine:", response.data);
        }
      }catch(error){
        alert("There was an error adding your cuisine.Please try again");
        console.error("Error:",error);
      }
    };

    const columns=[
        {field:"id", headerName:"ID", width:70},
        {field:"cuisine", headerName:"Cuisine type", flex:1},
        {field:"price", headerName:"Price Per Person($)",flex:1},
    ];

    return(
        <div className="body">
            <div className="add">
                <Button variant="contained" color="primary" onClick={()=>setOpen(true)}>Add Cuisine</Button>
                <DataGrid rows={cuisines || []} columns={columns} pageSize={5} getRowId={(row)=>row.id}/>
                    <Dialog  open={open} onClose={()=>setOpen(false)}>
                        <DialogTitle>Add New Cuisine</DialogTitle>
                        <DialogContent>
                            <TextField label="Cuisine Type" name="cuisine" fullWidth onChange={handleChange}/>
                            <TextField label="Price" name="price" fullWidth onChange={handleChange}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>setOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmit} color="primary">Add</Button>
                        </DialogActions>
                    </Dialog>
            </div>
        </div>
    );
}
export default AddCuisine;