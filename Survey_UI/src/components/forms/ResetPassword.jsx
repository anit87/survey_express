import React, { useState } from 'react'
import { Button, Box, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { Formik, Form } from "formik"
import { useDispatch, useSelector } from 'react-redux'

import { resetPasswordSchema, resetPasswordCode } from "../../utils/schemas/auth"
import { fetchAuthData } from '../../features/auth/authSlice'
import TextInput from '../inputs/TextInput'
import Alert from '../Alert'
const apiUrl = `/auth/resetpassword`

const initialValues = {
    email: '',
    resetCode: ''
}

const ResetPassword = () => {
    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState(null)
    const [alert, setAlert] = useState(false);
    const { error, loading, msg } = useSelector(state => state.auth)
    const [codeSent, setCodeSent] = useState(false)
    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    }


    return (
        <>
            <Alert open={alert} type={error ? "error" : "info"} msg={msg} onClose={() => setAlert(false)} />

            <Formik
                initialValues={initialValues}
                validationSchema={codeSent ? resetPasswordCode : resetPasswordSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!codeSent) {
                        dispatch(fetchAuthData(
                            {
                                apiUrl: import.meta.env.VITE_API_URL + apiUrl,
                                bodyOfRequest: values,
                                method: "POST"
                            }
                        ));
                        setSubmitting(false);
                        setCodeSent(true)
                        alertfn()
                    }

                }}
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h5">Enter Your Email To Reset Password</Typography>
                    <Box sx={{ mt: 1 }} >
                        <Form>

                            {!codeSent ?
                                <TextInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Please Enter Your Email"
                                />
                                : <TextInput
                                    label="6 Digit Code"
                                    name="resetCode"
                                    type="number"
                                    placeholder="123456"
                                />}
                            <Button fullWidth variant='contained' type='submit' sx={{ mt: 3, mb: 2 }} >{codeSent ? 'Enter Code' : "Send Code"}</Button>
                        </Form>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/" className='textDecoration' variant="body2">
                                    Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Formik >
        </>
    )
}

export default ResetPassword