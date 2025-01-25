import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OngoingEvents.css";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 75, align: 'center', headerAlign: 'center' },
    { field: 'full_name', headerName: 'Name', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'email', headerName: 'Email', width: 200, align: 'center', headerAlign: 'center' }
    ];  

function OngoingEvents () {


    //NOT DONE YET BAS 3MLT IMPORT LAL LIBABRY W KATABET BASIC INFO

    <DataGrid 
    onRowClick={handleRowClick} 
    rows={employees} 
    columns={columns} 
    sx={{
        '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
        },
    }}
    />


}

export default OngoingEvents;