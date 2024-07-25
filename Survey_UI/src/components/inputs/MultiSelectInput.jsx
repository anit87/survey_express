import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useField } from "formik"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultiSelectInput({ label, value, changeHandler, setFieldValue, options, ...props }) {
    const [field, meta] = useField(props);

    const handleChange = (event) => {
        const {
            target: { value: selectedValue },
        } = event;

        let newValue = Array.isArray(selectedValue) ? [...selectedValue] : [];

        if (newValue.includes(-1)) {
            newValue = [-1]; // Only allow "None of the Above"
        } else {
            newValue = newValue.filter((val) => val !== -1); // Remove "None of the Above" if other options are selected
        }

        setFieldValue('isParticipated', newValue); // Update the form value using setFieldValue
    };

    return (
        <div>
            <FormControl fullWidth className='multiple_selectdata' sx={{ marginTop: "8px" }}>
                <Stack direction="row">
                    <Typography
                        variant="h6"
                        gutterBottom
                        style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }}
                    >
                        {label}
                    </Typography>
                </Stack>
                <Select
                    id="select"
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => (
                        <Box className="multiple_val" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((val) => {
                                const item = options.find((item) => item.value === val);
                                return item ? <Chip key={val} label={item.label} /> : null;
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    error={Boolean(meta.touched && meta.error)}
                    helperText={Boolean(meta.touched && meta.error) ? meta.error : `   `}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value} >
                            <Checkbox checked={value.indexOf(option.value) > -1} />
                            <ListItemText primary={option.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}