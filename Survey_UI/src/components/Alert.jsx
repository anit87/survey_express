import React from 'react'
import MuiAlert from "@mui/material/Alert"
import { Button, Box, Grid, Typography, Snackbar } from "@mui/material"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertComponent = ({ open, type, msg, onClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={onClose}
        >
            <Alert severity={type} sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default AlertComponent