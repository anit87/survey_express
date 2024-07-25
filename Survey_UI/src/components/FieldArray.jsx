import React from 'react'
import { Box, Grid, Typography, Container, Button, Stack, IconButton } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const FieldArray = ({ children, arrayHelpers, array, label, objectOfValues }) => {
    return (
        <div>
            <Stack direction="row" spacing={4}>
                <Typography variant="subtitle2" gutterBottom>{label}</Typography>
                <IconButton size="small" onClick={() => arrayHelpers.push(objectOfValues)}><AddCircle fontSize="small" /></IconButton>
            </Stack>
            {array.map((friend, index) => (
                <Stack key={index} direction="row" spacing={4}>

                    {children}
                    <IconButton size="small" onClick={() => arrayHelpers.remove(index)}><RemoveCircle fontSize="small" /></IconButton>
                </Stack>
            ))}

        </div>
    )
}

export default FieldArray