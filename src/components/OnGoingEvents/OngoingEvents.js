import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import './OngoingEvents.css';

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function OngoingEvents({ userInfo }) {
    const [ongoingEvents, setOngoingEvents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [invoiceData, setInvoiceData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Default payment method
    const [loading, setLoading] = useState(false);

    const handleClickOpenPay = async (id) => {
        setLoading(true);
        setSelectedEvent(id);
        await fetchPayments(id);
        setLoading(false);
        setOpenDialog(true);
    };

    const handleClosePay = () => {
        setInvoiceData(null);
        setOpenDialog(false);
    };

    const fetchPayments = async (selectedEventId) => {
        try {
            const response = await axios.get(`${baseUrl}/fetch-payment`, {
                params: { id: selectedEventId },
            });
            if (response.data) {
                const invoiceData = response.data;
                invoiceData.venue.price = Number(invoiceData.venue.price);
                invoiceData.cuisine.price = Number(invoiceData.cuisine.price);
                invoiceData.tables.cost = Number(invoiceData.tables.cost);
                invoiceData.services = invoiceData.services.map(service => ({
                    ...service,
                    price: Number(service.price),
                }));
                setInvoiceData(invoiceData);
            }
        } catch (error) {
            console.error("Error fetching payment:", error);
            alert("Unable to fetch payment details. Please try again.");
        }
    };

    const handlePaymentClick = async () => {
        try {
            const response = await axios.post(`${baseUrl}/new-payment`, {
                invoiceData,
                paymentMethod 
            });
            handleClosePay(); 
            getActiveEvents();
        } catch (error) {
            console.error("Error sending payment details:", error);
            alert("Error processing payment. Please try again.");
        }
    };

    const columns = [
        { field: 'event_title', headerName: 'Title', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'event_date', headerName: 'Date', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'status', headerName: 'Status', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'duration', headerName: 'Duration', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'venue_name', headerName: 'Venue', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'cuisine_name', headerName: 'Cuisine', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'attendance_number', headerName: 'Nb. of People', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'number_of_tables', headerName: 'Nb. of Tables', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'persons_per_table', headerName: 'Persons per Table', flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'action',
            headerName: 'Payment',
            width: 150,
            renderCell: (params) => {
                return (
                    params.row.status === 'Payment Pending' ? (
                        <button
                            className="pay-button"
                            onClick={() => handleClickOpenPay(params.row.event_id)}
                        >
                            Pay Now
                        </button>
                    ) : null
                );
            },
            align: 'center',
            headerAlign: 'center',
        },
    ];

    const formatDate = (date) => {
        return format(new Date(date), 'dd-MM-yyyy');
    };

    const getActiveEvents = async () => {
        const userId = userInfo.id;

        try {
            const response = await axios.get(`${baseUrl}/get-events`, {
                params: { userId },
            });
            setOngoingEvents(response.data.map(event => ({
                ...event,
                id: event.event_id,
                event_date: formatDate(event.event_date),
            })));
        } catch (error) {
            console.error("Error fetching user's events: ", error);
        }
    };

    useEffect(() => {
        if (userInfo?.id) {
            getActiveEvents();
        }
    }, [userInfo]);

    return (
        <div className="body">
            <div className="ongoing">
                <DataGrid
                    rows={ongoingEvents}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    sx={{
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer',
                        },
                    }}
                />
            </div>

            <Dialog open={openDialog} onClose={handleClosePay}>
                <DialogTitle sx={{ color: 'black' }}>Proceed with Payment</DialogTitle>
                <DialogContent>
                    {invoiceData ? (
                        <>
                            <DialogContentText>
                                <strong>Venue:</strong> {invoiceData.venue.name} (${invoiceData.venue.price})
                            </DialogContentText>
                            <DialogContentText>
                                <strong>Cuisine:</strong> {invoiceData.cuisine.name} (${invoiceData.cuisine.price})
                            </DialogContentText>
                            <DialogContentText>
                                <strong>Tables:</strong> {invoiceData.tables.number} (${invoiceData.tables.cost})
                            </DialogContentText>
                            <DialogContentText>
                                <strong>Services:</strong>
                                {invoiceData.services.map((service, index) => (
                                    <div key={index}>
                                        {service.name}: ${service.price}
                                    </div>
                                ))}
                            </DialogContentText>
                            <DialogContentText>
                                <strong>Total Cost:</strong> ${invoiceData.total_cost}
                            </DialogContentText>

                            <FormControl component="fieldset" margin="normal">
                                <FormLabel component="legend">Payment Method</FormLabel>
                                <RadioGroup
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="Credit Card"
                                        control={<Radio />}
                                        label="Credit Card"
                                    />
                                    <FormControlLabel
                                        value="Cash"
                                        control={<Radio />}
                                        label="Cash"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </>
                    ) : (
                        <DialogContentText>Loading invoice...</DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePay} color="primary">
                        Close
                    </Button>
                    <Button 
                        onClick={handlePaymentClick} 
                        color="primary" 
                        variant="contained"
                    >
                        Pay Now
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default OngoingEvents;
