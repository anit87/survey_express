import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Navbar from '../Navbar';

const drawerWidth = 240;

function ResponsiveDrawer(props) {

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                color="transparent"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    mt: 10,
                    boxShadow: 0
                }}
            >
                <Navbar/>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Navbar/>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {props.children}
            </Box>
        </Box>
    );
}

export default ResponsiveDrawer;



