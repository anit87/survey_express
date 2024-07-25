import React, { useState } from 'react'
import { Button, Box, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { Formik, Form } from "formik"
import { useDispatch, useSelector } from 'react-redux'

import { signUpSchema } from "../../utils/schemas/auth"
import { fetchAuthData } from '../../features/auth/authSlice'
import TextInput from '../inputs/TextInput'
import Alert from '../Alert'
const apiUrl = `/auth/signup`

const initialValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState(null)
    const [alert, setAlert] = useState(false);

    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    }

    const {data,error, loading, msg} = useSelector(state=>state.auth)

    return (
        <>
            <Alert open={alert} type={error ? "error" : "info"} msg={msg} onClose={() => setAlert(false)} />

            <Formik
                initialValues={initialValues}
                validationSchema={signUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(fetchAuthData(
                        {
                            apiUrl: import.meta.env.VITE_API_URL + apiUrl,
                            bodyOfRequest:values,
                            method:"POST"
                        }
                    ));
                    alertfn()
                    setSubmitting(false);
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
                    <Typography variant="h5">Sign Up</Typography>
                    <Box sx={{ mt: 1 }} >
                        <Form>
                            <TextInput
                                label="Name"
                                name="displayName"
                                type="text"
                                placeholder="Please Enter Your Name"
                            />

                            <TextInput
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Please Enter Your Email"
                            />

                            <TextInput
                                label="Password"
                                name="password"
                                type="text"
                                placeholder="*******"
                            />

                            <TextInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="text"
                                placeholder="*******"
                            />
                            <Button fullWidth variant='contained' type='submit' sx={{ mt: 3, mb: 2 }} >SignUp</Button>
                        </Form>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Formik >
        </>
    )
}

export default SignUp
