import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams, useNavigate } from 'react-router-dom';
import SmallImageCard from '../SmallImageCard';
import TableHeader, { StyledTableCell } from './TableHeader';
const apiUrl = import.meta.env.VITE_API_URL

const tableCells = [{ label: 'Name' }, { label: 'Age' }, { label: 'Gender' }, { label: 'Assembly' }, { label: 'Voter Id' }, { label: 'Voter Id' }, { label: '' }]

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function DataTable({ formsDetail }) {
    let { id } = useParams();
    const navigate = useNavigate()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHeader tableCells={tableCells} />
                {formsDetail &&
                    <TableBody>
                        {formsDetail.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="">{row.age}</StyledTableCell>
                                <StyledTableCell align="">{row.gender}</StyledTableCell>
                                <StyledTableCell align="">{row.assembly == 1 ? "Govindraj Nagar": row.assembly == 2? "Vijay Nagar":"N/A" }</StyledTableCell>
                                <StyledTableCell align="">{row.voterId == 1 ? "Yes" : "No"}</StyledTableCell>
                                <StyledTableCell align="">{row.voterIdNum}</StyledTableCell>
                                <StyledTableCell align=""
                                    onClick={() => window.open(`${apiUrl}/uploads/${row.voterIdImg || "Voter_Id_Image/no-image.png"}`, '_blank')}
                                >
                                    <SmallImageCard imageUrl={`${apiUrl}/uploads/${row.voterIdImg || "Voter_Id_Image/no-image.png"}`} />
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                }
            </Table>
        </TableContainer>
    );
}