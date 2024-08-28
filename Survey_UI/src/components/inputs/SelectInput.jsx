import React, { useState } from 'react';
import { TextField, MenuItem, IconButton, FormControl, FormLabel, InputLabel, Typography, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useField } from "formik"
import Popper from '../Popper';

export default function SelectTextFields({ id, label, title, options, editable, textValue, ...props }) {
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
            <FormControl fullWidth sx={{ mt: 1 }}>
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
                            id={id}
                            select
                            fullWidth
                            size="small"
                            InputLabelProps={{
                                style: { fontSize: '14px', mb: "8px" }
                            }}
                            InputProps={{
                                sx: { fontSize: '14px' }
                            }}
                            label=""
                            title={title}
                            defaultValue={null}
                            variant="outlined"
                            error={Boolean(meta.touched && meta.error)}
                            helperText={Boolean(meta.touched && meta.error) ? meta.error : `   `}
                            {...field} {...props}
                        >
                            {
                                options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        {!title
                            ? null
                            : <IconButton
                                size="small"
                                aria-label="helper"
                                onClick={(event) =>
                                    handleHelperIconClick(event, title)
                                }
                            >
                                <InfoIcon fontSize="small" />
                            </IconButton>}
                    </Stack>}
                <Popper
                    open={open} anchorEl={anchorEl} helperText={helperTextInfo} handlePopperClose={handlePopperClose}
                />
            </FormControl>

        </>

    );
}

const SelectInput = ({ label, name, value, options, changeHandler, className = null }) => {

    return (
        <FormControl fullWidth className={className}>
            <Stack direction="row">
                <Typography variant="h6" gutterBottom
                    style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }}
                >
                    {label}
                </Typography>
            </Stack>

            <TextField id="select"
                margin="none"
                size="small"
                fullWidth
                name={name}
                label={""}
                value={value}
                onChange={changeHandler}
                select
            >
                {
                    options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </TextField>
        </FormControl>
    )
}

export { SelectInput }