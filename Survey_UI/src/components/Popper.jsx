import React from 'react'
import { Popper, Paper, ClickAwayListener, Typography} from "@mui/material"

const Popper1 = ({open,handlePopperClose, anchorEl, helperText}) => {
    return (
        <Popper style={{ zIndex: 1000 }} open={open} anchorEl={anchorEl} placement="bottom"  >
            <ClickAwayListener onClickAway={handlePopperClose}>
                <Paper style={{ padding: '10px', position: 'relative' }} >
                    <Typography sx={{ p: 2,bgcolor:"aliceblue",zIndex: 1000 }}>{helperText}</Typography>
                </Paper>
            </ClickAwayListener>
        </Popper>
    )
}

export default Popper1