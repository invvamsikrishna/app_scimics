import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const borders ={
    borderRight:"2px solid gray",
    borderBottom:"2px solid gray",
}
function createData(name, Analytical, Quantitative, English, Domain,Computer,Coding,WET) {
    return { name, Analytical, Quantitative, English, Domain,Computer,Coding,WET};
}

const rows = [
    createData('Analyst', "REQUIRED", "REQUIRED", "REQUIRED", " ", " ", " ", "REQUIRED"),
    createData('Customer Service Executive', "REQUIRED", " ", "REQUIRED", " ", " ", " ", "REQUIRED"),
    createData('Graduate Engineer (Plant)', "REQUIRED", "REQUIRED", "REQUIRED", "REQUIRED", " ", " ", " "),
    createData('Graduate Engineer (R&D)', "REQUIRED", "REQUIRED", "REQUIRED", "REQUIRED", " ", " ", " "),
    createData('Network Engineer', "REQUIRED", " ", " ", " ", "REQUIRED", " ", " "),
    createData('Operations Executive', "REQUIRED", "REQUIRED", "REQUIRED", " ", " ", " ", " "),
    createData('Sales Executive', "REQUIRED", "REQUIRED", "REQUIRED", " ", " ", " ", "REQUIRED"),
    createData('Software Developer', "REQUIRED", "REQUIRED", "REQUIRED", " ", " ", "REQUIRED", " "),
    createData('Software Engineer', "REQUIRED", "REQUIRED", "REQUIRED", " ", "REQUIRED", " ", "REQUIRED"),
    createData('Software Tester', "REQUIRED", "REQUIRED", "REQUIRED", " ", "REQUIRED", " ", " "),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor:"white" }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell style={borders}></TableCell>
                        <TableCell style={borders} sx={{ color:'black'}} align="center">Analytical</TableCell>
                        <TableCell style={borders} sx={{ color:'black'}} align="center">Quantitative</TableCell>
                        <TableCell style={borders} sx={{ color:'black'}} align="center">English</TableCell>
                        <TableCell style={borders} sx={{ color:'black'}} align="center">Domain</TableCell>
                        <TableCell style={borders} sx={{ color:'black'}} align="center">Computer Fundamentals</TableCell>
                        <TableCell style={borders} sx={{ color:'black'}} align="center">Coding</TableCell>
                        <TableCell style={borders} sx={{ color:'black'}} align="center">WET</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} >
                            <TableCell style={borders} sx={{ minWidth: 180, fontWeight:"bold",color:'black' }} component="th" >{row.name}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070'}} align="center" >{row.Analytical}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070'}} align="center" >{row.Quantitative}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070'}} align="center" >{row.English}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070'}} align="center" >{row.Domain}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070'}} align="center" >{row.Computer}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070'}} align="center" >{row.Coding}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070'}} align="center" >{row.WET}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
