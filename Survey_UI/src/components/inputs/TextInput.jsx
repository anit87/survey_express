import React, { useState } from 'react'
import { TextField, FormControl, FormLabel, IconButton, Typography, Stack } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import { useField } from "formik"
import PropTypes from 'prop-types';

import Popper from '../Popper';

const TextInput = ({ label, title, editable,textValue, ...props }) => {
    const [field, meta] = useField(props);
    const [anchorEl, setAnchorEl] = useState(null);
    const [helperTextInfo, setHelperText] = useState('');

    const handleHelperIconClick = (event, text) => {
        setAnchorEl(event.currentTarget);
        setHelperText(text);
    };

    const handlePopperClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <FormControl fullWidth sx={{mt:1}} >
                <Stack direction="row">
                    <Typography variant="h6" style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>{label}</Typography>
                </Stack>
                {editable ?
                    <Typography variant="subtitle1" style={{ fontSize: "14px", textAlign: "left" }}
                        sx={{ pt: 1, pb: 1 }} gutterBottom
                    >
                        {textValue}
                    </Typography> :
                    <Stack direction="row">
                        <TextField
                            margin="none"
                            fullWidth
                            size="small"
                            InputLabelProps={{
                                sx: { fontSize: '.8rem', mb: "8px" }
                            }}
                            InputProps={{
                                sx: { fontSize: '14px' }
                            }}
                            label=""
                            variant="outlined"
                            title={title}
                            error={Boolean(meta.touched && meta.error)}
                            helperText={Boolean(meta.touched && meta.error) ? meta.error : ``}
                            {...field} {...props}
                        />
                        {
                            !title
                                ? null
                                : <IconButton
                                    size="small"
                                    aria-label="helper"
                                    onClick={(event) =>
                                        handleHelperIconClick(event, title)
                                    }
                                >
                                    <InfoIcon fontSize="small"/>
                                </IconButton>
                        }
                    </Stack>
                }
                <Popper
                    open={open} anchorEl={anchorEl} helperText={helperTextInfo} handlePopperClose={handlePopperClose}
                />
            </FormControl>
        </>
    );
}
TextInput.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string
}

export default TextInput
