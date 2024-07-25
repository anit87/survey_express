import React, { useState, useEffect } from 'react';
import { Box, Grid, Container, Button, Toolbar } from "@mui/material";
import { Formik, Form } from "formik";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Alert from '../../Alert';
import TextInput from '../../inputs/TextInput';
import SelectInput from '../../inputs/SelectInput';
import { verifyUser } from '../../../utils/functions/verifyUser';
import { useLanguageData } from '../../../utils/LanguageContext';
import { generateEstablishmentOptions } from '../../../utils/constants';
import Loader from '../../loader';
import { usePostcomercialFormMutation } from '../../../features/auth/commercial';
import { commercialFormSchema } from '../../../utils/schemas/surveyForm';

const apiUrl = import.meta.env.VITE_API_URL + '/commercial/getForm';

const CommercialForm = () => {
    const { translate } = useLanguageData();
    let { formId } = useParams();
    const navigate = useNavigate();
    const [postcomercialForm, { data, isError, isLoading, error }] = usePostcomercialFormMutation();

    const establishmentOptions = generateEstablishmentOptions(translate);

    const [formsDetail, setFormsDetail] = useState(null);
    const [isFormLoading, setisFormLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    const initialValues = {
        establishmentName: formsDetail ? formsDetail.establishmentName : '',
        establishmentType: formsDetail ? formsDetail.establishmentType : '',
        natureOfBusiness: formsDetail ? formsDetail.natureOfBusiness : '',
        contactPerson: formsDetail ? formsDetail.contactPerson : '',
        contactNumber: formsDetail ? formsDetail.contactNumber : '',
    }

    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    };

    useEffect(() => {
        if (formId) {
            getFormDetail(formId);
        }
    }, [formId]);

    const getFormDetail = async (formKey) => {
        try {
            setisFormLoading(true)
            const response = await axios.post(apiUrl, { id: formKey });
            setFormsDetail(response.data.data);
        } catch (error) {
            console.error('Error fetching form details:', error);
        } finally {
            setisFormLoading(false);
        }
    };

    return (
        <>
            <Alert open={alert} type={isError ? "error" : "info"} msg={isError ? error?.msg : data?.msg} onClose={() => setAlert(false)} />
            <Toolbar />
            <h6 style={{ fontSize: "20px", fontWeight: "bold" }} >Sahaya Hasta</h6>
            <br />

            <Container maxWidth="fixed">
                <Box sx={{ height: '100%', mt: 1 }} >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={commercialFormSchema}
                        onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
                            try {
                                setSubmitting(true);
                                await postcomercialForm(values).unwrap();
                                alertfn();
                                resetForm();
                                formId && navigate('/surveys')
                            } catch (error) {
                                console.error('Submission error:', error);
                                alertfn();
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {(formik) => {
                            const { setFieldValue } = formik;

                            useEffect(() => {
                                if (formId && formsDetail) {
                                    setFieldValue("establishmentName", formsDetail?.establishmentName);
                                    setFieldValue("establishmentType", formsDetail?.establishmentType);
                                    setFieldValue("natureOfBusiness", formsDetail?.natureOfBusiness);
                                    setFieldValue("contactPerson", formsDetail?.contactPerson);
                                    setFieldValue("contactNumber", formsDetail?.contactNumber);
                                    setFieldValue("formId", formId);
                                }
                            }, [formId, formsDetail, setFieldValue]);
                            return (
                                < Form >
                                    {formik.isSubmitting ? <Loader /> :
                                        <div>
                                            <br />
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                                <Grid item md={6} xs={12}>
                                                    <TextInput
                                                        label={translate("NameOfTheEstablishment")}
                                                        name="establishmentName"
                                                        type="text"
                                                        placeholder="Please Provide Establishment Name"
                                                    />
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <SelectInput
                                                        label={translate('TypeOfEstablishment')}
                                                        id="establishmentType"
                                                        name="establishmentType"
                                                        options={establishmentOptions}
                                                    />
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <TextInput
                                                        label={translate("NatureOfBusiness")}
                                                        name="natureOfBusiness"
                                                        type="text"
                                                        placeholder="Enter Nature Of Business"
                                                    />
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <TextInput
                                                        label={translate('ContactPersonName')}
                                                        name="contactPerson"
                                                        type="text"
                                                        placeholder="Contact Person Name"
                                                    />
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <TextInput
                                                        label={translate('contactNumber')}
                                                        name="contactNumber"
                                                        type="number"
                                                        placeholder="Contact Person Name"
                                                    />
                                                </Grid>

                                            </Grid>
                                        </div>
                                    }
                                    <div className='d-flex flex-row-reverse bd-highlight' style={{ float: "right" }}>
                                        {
                                            <Button variant='contained'
                                                type='submit'
                                                style={{ textAlign: "right" }}
                                                sx={{ mt: 3, pl: 3, pr: 3 }}
                                                disabled={formik.isSubmitting}
                                            >
                                                {formId ? "Update" : "Submit"}
                                            </Button>
                                        }
                                    </div>
                                </Form>
                            )
                        }}

                    </Formik >
                </Box>
            </Container >
        </>
    )
}

export default CommercialForm;