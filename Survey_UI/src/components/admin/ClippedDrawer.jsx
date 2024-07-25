import React from 'react';
import Box from '@mui/material/Box';
import Navbar from '../Navbar';


export default function layout({ children }) {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
            <Navbar />
            {children}
        </Box>
    );
}
