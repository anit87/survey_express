import React from 'react';
import { Typography, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const DynamicDatePicker = ({ label, name, defaultValue, minDate, filterData, setFilterData }) => {
    const [error, setError] = React.useState(null);
    const errorMessage = React.useMemo(() => {
        switch (error) {
            case 'maxDate':
            case 'minDate': {
                return 'Please select valid date';
            }
            case 'invalidDate': {
                return 'Your date is not valid';
            }
            default: {
                return '';
            }
        }
    }, [error]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth>
                <Typography variant="h6"
                    style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom
                >{label}</Typography>
                <DatePicker
                    defaultValue={dayjs(defaultValue)}
                    name={name}
                    onChange={(value) => setFilterData({ ...filterData, [name]: value.format('YYYY-MM-DD') })}
                    onError={(newError) => setError(newError)}
                    slotProps={{
                        textField: {
                            helperText: errorMessage,
                            size: "small"
                        },
                    }}
                    minDate={dayjs(minDate)}
                    maxDate={dayjs()}
                    format="DD-MM-YYYY"
                />
            </FormControl>
        </LocalizationProvider>
    );
};

export default DynamicDatePicker;