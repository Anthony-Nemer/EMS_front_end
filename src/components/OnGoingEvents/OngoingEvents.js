import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { format } from 'date-fns';
import './OngoingEvents.css';

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function OngoingEvents({ userInfo }) {
    const [ongoingEvents, setOngoingEvents] = useState([]);

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
        <div className='body'>
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
        </div>
    );
}

export default OngoingEvents;
