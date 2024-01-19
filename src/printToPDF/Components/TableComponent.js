import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';

const borders ={
    borderRight:"2px solid #009ba5",
    borderBottom:"2px solid #009ba5",
    borderTop:"2px solid #009ba5",
    borderLeft:"2px solid #009ba5",
}
function createData(name, Analytical, Quantitative, English, Domain) {
    return { name, Analytical, Quantitative, English, Domain};
}

const rows = [
    createData('Analyst', "REQUIRED", "REQUIRED", "REQUIRED", " "),
    createData('Customer Service Executive', " ", "REQUIRED", "REQUIRED","REQUIRED"),
    createData('Graduate Engineer (Plant)', " ", " ", "REQUIRED", "REQUIRED"),
    createData('Graduate Engineer (R&D)', "REQUIRED", "REQUIRED", "REQUIRED", " "),
    createData('Network Engineer', "REQUIRED", "REQUIRED", " ", " "),
    createData('Operations Executive', " ", "REQUIRED", "REQUIRED", "REQUIRED"),
    createData('Sales Executive', " ", " ", "REQUIRED", "REQUIRED"),
    createData('Software Developer', "REQUIRED", "REQUIRED", "REQUIRED", " "),
    createData('Software Engineer', "REQUIRED", "REQUIRED", "REQUIRED", " "),
    createData('Software Tester', " ", "REQUIRED", "REQUIRED", " "),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor:"white" }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ minHeight: 10}} ></TableCell>
                        <TableCell sx={{ color:'black', minHeight: 10}} align="center">Cognitive Abilities</TableCell>
                        <TableCell sx={{ color:'black', minHeight: 10}} align="center">Technical Proficiency</TableCell>
                        <TableCell sx={{ color:'black', minHeight: 10}} align="center">Communication Skills</TableCell>
                        <TableCell sx={{ color:'black', minHeight: 10}} align="center">Personality Behaviour</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} >
                            <TableCell sx={{ minWidth: 265, fontWeight:"bold", color:'black', minHeight: 10 }} component="th" >{row.name}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070', minHeight: 10}} align="center" >{row.Analytical}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070', minHeight: 10}} align="center" >{row.Quantitative}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070', minHeight: 10}} align="center" >{row.English}</TableCell>
                            <TableCell style={borders} sx={{ color:'#1e6070', minHeight: 10}} align="center" >{row.Domain}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
