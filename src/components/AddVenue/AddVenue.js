import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import "./AddVenue.css";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const AddVenue = () => {
    const [venues, setVenues] = useState([]);
    const [open, setOpen] = useState(false);
    const [newVenue, setNewVenue] = useState({
        name: "",
        address: "",
        capacity: "",
        photo: "",
        isAvailable: true,
        price: "",
    });

    useEffect(() => {
        axios.get(`${baseUrl}/fetch-venues`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setVenues(response.data);
                } else {
                    console.error("Invalid API response: Expected an array, got", response.data);
                    setVenues([]);
                }
            })
            .catch(error => {
                console.error("Error fetching venues:", error);
                setVenues([]);
            });
    }, []);

    const handleChange = (e) => {
        setNewVenue({ ...newVenue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const venueData = { ...newVenue };
        console.log("Sending venue data:", venueData);

        try {
            const response = await axios.post(`${baseUrl}/new-venue`, venueData);
            if (response.status === 201) {
                alert("Venue added successfully");
                setVenues([...venues, { ...venueData, id: response.data.id }]);
                setOpen(false);
            } else {
                console.error("Error adding venue:", response.data);
            }
        } catch (error) {
            alert("There was an error adding your venue. Please try again.");
            console.error("Error:", error);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Venue Name", flex: 1 },
        { field: "address", headerName: "Address", flex: 1 },
        { field: "capacity", headerName: "Capacity", flex: 1 },
        { field: "photo", headerName: "Photo", flex: 1, renderCell: (params) => <img src={params.value} alt="Venue" style={{ width: 100, height: 60 }} /> },
        { field: "isAvailable", headerName: "Available", flex: 1, type: "boolean" },
        { field: "price", headerName: "Price ($)", flex: 1 },
    ];

    return (
        <div className="body">
        <div className="container">
            <div className="button-container">
                <Button variant="contained" color="primary" className="add-button" onClick={() => setOpen(true)}>
                    Add Venue
                </Button>
            </div>
            <div className="table-container">
                <DataGrid rows={venues || []} columns={columns} pageSize={5} getRowId={(row) => row.id} />
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Venue</DialogTitle>
                <DialogContent>
                    <TextField label="Venue Name" name="name" fullWidth onChange={handleChange} />
                    <TextField label="Address" name="address" fullWidth onChange={handleChange} />
                    <TextField label="Capacity" name="capacity" type="number" fullWidth onChange={handleChange} />
                    <TextField label="Photo URL" name="photo" fullWidth onChange={handleChange} />
                    <TextField label="Price" name="price" fullWidth type="number" onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
        </div>
    );
}

export default AddVenue;
