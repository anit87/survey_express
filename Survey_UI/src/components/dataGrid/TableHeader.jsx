import React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1565c0",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const TableHeader = ({ tableCells }) => {
    return (
        <TableHead>
            <TableRow>
                {
                    tableCells.map((obj, index) => <StyledTableCell key={index} align={obj.textAlign || "left"}>{obj.label}</StyledTableCell>)
                }
            </TableRow>
        </TableHead>
    )
}

export default TableHeader;
export { StyledTableCell };