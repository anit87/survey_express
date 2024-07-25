import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container, Button, Stack, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Alert from '../../Alert';
import TextInput from '../../inputs/TextInput';
import SelectInput from '../../inputs/SelectInput';
import MultiSelectInput from '../../inputs/MultiSelectInput';
import { verifyUser } from '../../../utils/functions/verifyUser';
import { getLocation } from '../../../utils/location/getLocation';
import FileUpload from '../../inputs/FileUpload';
import CameraCapture from '../../CameraCapture';
import SmallImageCard from '../../SmallImageCard';
import { useLanguageData } from '../../../utils/LanguageContext';
import { objectToFormData, appendArrayToFormData } from '../../../utils/functions/objectToFormData';
import { surveyFormSchema, surveyFormSchemaStep0, surveyFormSchemaStep1, surveyFormSchemaStep2, surveyFormSchemaStep3 } from '../../../utils/schemas/surveyForm';
import {
    generateageOptions,
    generateIncomeOptions,
    generateTrueFalseOptions,
    generateEducationalOptions,
    generategovernmentSchemesOptions,
    generatecategoryOptions,
    generateCasteOptions,
    generatereligionOptions,
    generateConstituencyOptions,
    generateVotedLastElectionOptions
} from '../../../utils/constants';
import Loader from '../../loader';

const apiUrl = import.meta.env.VITE_API_URL + '/forms';

const FieldArrayAddIcon = ({ label, arrayHelpers, object }) => {
    return (
        <Stack direction="row">
            <Typography variant="subtitle1" style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} sx={{ pt: 1, pb: 1 }} gutterBottom>{label}</Typography>
            <IconButton size="small" onClick={() => arrayHelpers.push(object)}>
                <AddCircle fontSize="small" />
            </IconButton>
        </Stack>
    );
};

const FieldArrayRemoveIcon = ({ index, arrayHelpers, array, translate }) => {
    return (
        <Box display="flex" justifyContent="left" alignItems="center">
            <Typography variant="subtitle2" style={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>{translate('Member')}&nbsp;{index + 1}</Typography>
            <IconButton disabled={array.length < 2} size="small" onClick={() => arrayHelpers.remove(index)}>
                <RemoveCircle fontSize="small" />
            </IconButton>
        </Box>
    );
};

const SurveyForm = ({ activeStep, setActiveStep, formsDetail = null, formId = null }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { translate } = useLanguageData();
    const incomeOptions = generateIncomeOptions(translate);
    const trueFalseOptions = generateTrueFalseOptions(translate);
    const votedLastElectionOptions = generateVotedLastElectionOptions(translate);
    const educationalOptions = generateEducationalOptions(translate);
    const casteOptions = generateCasteOptions(translate);
    const religionOptions = generatereligionOptions(translate);
    const constituencyOptions = generateConstituencyOptions(translate);
    const governmentSchemesOptions = generategovernmentSchemesOptions(translate);
    const ageOptions = generateageOptions(translate);
    const categoryOptions = generatecategoryOptions(translate);

    const [userId, setUserId] = useState(" ");
    const [alert, setAlert] = useState(false);
    const [savedResp, setSavedResp] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputValues, setInputValues] = useState([]);
    const [capturedFile, setcapturedFile] = useState(null);
    const [isCapturing, setisCapturing] = useState(false);
    const [capturingIndex, setCapturingIndex] = useState("");
    const [selectedLocationFile, setSelectedLocationFile] = useState(null);
    const [capturedLocationFile, setcapturedLocationFile] = useState(null);
    const [isLocationCapturing, setisLocationCapturing] = useState(false);

    const token = localStorage.getItem('surveyApp');
    const mydata = useSelector(state => state.auth);

    useEffect(() => {
        const data = mydata.token || token;
        const { id } = verifyUser(data);
        setUserId(id);
    }, [userId, token]);

    const alertfn = () => {
        setTimeout(() => setAlert(true), 1000);
    };

    const handleInputChange = (id, event, index, img) => {
        if (id === 1) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setcapturedFile("");
        } else if (id === 2) {
            const updatedValues = [...inputValues];
            updatedValues[index] = event ? event.target.files[0] : img;
            setInputValues(updatedValues);
        } else if (id === 3) {
            const file = event.target.files[0];
            setSelectedLocationFile(file);
            setcapturedLocationFile("");
        }
    };

    const initialValues = {
        respondentName: formsDetail ? formsDetail.respondentName : '',
        address: formsDetail ? formsDetail.address : '',
        pincode: formsDetail ? formsDetail.pincode : '',
        mobileNo: formsDetail ? formsDetail.mobileNo : '',
        isOwnProperty: formsDetail ? formsDetail.isOwnProperty : '',
        totalMembers: formsDetail ? formsDetail.totalMembers : '',
        religion: formsDetail ? formsDetail.religion : '',
        caste: formsDetail ? formsDetail.caste : '',
        cweEducation: formsDetail ? formsDetail.cweEducation : '',
        isParticipated: formsDetail ? formsDetail.isParticipated : [],
        categoryFallUnder: formsDetail ? formsDetail.categoryFallUnder : '',
        birthdayDate: formsDetail ? formsDetail.birthdayDate : '',
        dateOfBirth: formsDetail ? formsDetail?.dateOfBirth?.slice(0, 10) : '',
        weddingDate: formsDetail ? formsDetail?.weddingDate?.slice(0, 10) : '',
        registeredVoter: formsDetail ? formsDetail.registeredVoter : '',
        voterIdNumber: formsDetail ? formsDetail.voterIdNumber : '',
        votedLastElection: formsDetail ? formsDetail?.votedLastElection : '',
        ageGroupOfMembers: formsDetail ? (formsDetail.ageGroupOfMembers.length > 0 ? formsDetail.ageGroupOfMembers : [{ name: '', age: '', gender: "", assembly: "", voterId: "", voterIdNum: "", voterIdImg: "" }]) : [{ name: '', age: '', gender: "", assembly: "", voterId: "", voterIdNum: "", voterIdImg: "" }],
        maritalStatus: formsDetail ? formsDetail.maritalStatus : '',
        occupationStatus: formsDetail ? formsDetail.occupationStatus : '',
        monthlyHouseholdIncome: formsDetail ? formsDetail.monthlyHouseholdIncome : '',
        isCelebrities: formsDetail ? formsDetail?.isCelebrities : '',
        boothNumber: formsDetail ? formsDetail?.boothNumber : '',
        constituency: formsDetail ? formsDetail?.constituency : '',
        wardNumber: formsDetail ? formsDetail?.wardNumber : '',
    }

    useEffect(() => {
        if (formId && formsDetail) {
            setSelectedFile({ name: formsDetail.voterIdImage });
            setSelectedLocationFile({ name: formsDetail.locationPicture });
            const extractedVoterIdImg = formsDetail.ageGroupOfMembers.map(member => ({
                name: member.voterIdImg
            }));
            setInputValues(extractedVoterIdImg);
        }
    }, [formId, formsDetail])

    return (
        <>
            <Alert open={alert} type={!savedResp.status ? "error" : "info"} msg={savedResp.msg} onClose={() => setAlert(false)} />

            <Container maxWidth="fixed">
                <Box sx={{ height: '100%', mt: 1 }} >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={
                            !formId ?
                                (
                                    activeStep === 0 ? surveyFormSchemaStep0 :
                                        activeStep === 1 ? surveyFormSchemaStep1 :
                                            activeStep === 2 ? surveyFormSchemaStep2 :
                                                activeStep === 3 ? surveyFormSchemaStep3 :
                                                    activeStep === 4 ? surveyFormSchema : surveyFormSchema
                                )
                                : ""
                        }

                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
                            try {
                                setSubmitting(true);
                                if (activeStep === 1 && values.religion === 1 && !values.caste) {
                                    setFieldError("caste", "Please Select Caste");
                                } else if (activeStep === 3 && !values.isParticipated) {
                                    setFieldError("isParticipated", "Please Select Government Schemes");
                                } else if (activeStep !== 4) {
                                    setActiveStep(activeStep + 1);
                                } else if (activeStep === 4 && !values.ageGroupOfMembers[0].name) {
                                    setFieldError("ageGroupOfMembers", "Please Enter all Values");
                                } else {
                                    // const locat = await getLocation()
                                    const formData = objectToFormData(values)
                                    formData.append('voterIdImage', selectedFile);
                                    formData.append('voterIdImagee', capturedFile);
                                    formData.append('locationPicture', selectedLocationFile);
                                    formData.append('locationPicturee', capturedLocationFile);
                                    // formData.append('location', JSON.stringify(locat));
                                    formData.append('filledBy', userId);
                                    if (inputValues.length > 0) {
                                        appendArrayToFormData(formData, 'voterIdImageMember', inputValues)
                                    }

                                    const resp = formId ? await axios.put(`${apiUrl}/${formId}`, formData) : await axios.post(apiUrl, formData);
                                    setSavedResp(resp.data);
                                    alertfn();
                                    resetForm();
                                    setActiveStep(0);
                                    formId && navigate('/surveys');
                                }
                            } catch (error) {
                                console.error('Submission error:', error);
                                // Optionally, set a global error message for the form
                                setFieldError('submission', 'An error occurred during submission. Please try again.');
                                setSubmitting(false);
                            }
                        }}
                    >
                        {(formik) => {
                            const { setFieldValue } = formik;

                            useEffect(() => {
                                if (formId && formsDetail) {
                                    setFieldValue("religion", formsDetail?.religion);
                                }
                            }, [formId, formsDetail, setFieldValue]);

                            const condition1 = formsDetail?.religion == 1;
                            const condition2 = formik.values.religion == 1;

                            const shouldRender = formId ? (condition1 && condition2) : condition2;

                            return (
                                < Form >
                                    {formik.isSubmitting ? <Loader /> :
                                        <div>
                                            <br />
                                            {activeStep === 0 &&
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate("ApplicantName")}
                                                            title="Please Enter Your Name"
                                                            name="respondentName"
                                                            type="text"
                                                            placeholder="Please Provide Your Full Name"
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate("Address")}
                                                            title="Please Enter Your Full Address"
                                                            name="address"
                                                            type="text"
                                                            placeholder="Enter Your Full Mailing Address Here"
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate('Pincode')}
                                                            title="Enter Your Area Pincode"
                                                            name="pincode"
                                                            type="number"
                                                            placeholder="454545"
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate('MobileNumber')}
                                                            title="Enter Your Mobile No"
                                                            name="mobileNo"
                                                            type="number"
                                                            placeholder="9874563210"
                                                        />
                                                    </Grid>
                                                </Grid>
                                            }

                                            {activeStep === 1 &&
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate("TotalMembers")}
                                                            title="Total Number of Members in Your Family"
                                                            name="totalMembers"
                                                            type="number"
                                                            placeholder="Total Members"
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate("EducationDetailsCWE")}
                                                            title='Education level of the Chief Wage Earner (CWE) of your household. Person who contributes the maximum to the household income'
                                                            id="chiefWageEarnereEducation"
                                                            name="cweEducation"
                                                            options={educationalOptions}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate("Religion")}
                                                            title="Kindly Select Your Religion"
                                                            id="religion"
                                                            name="religion"
                                                            options={religionOptions}
                                                        />
                                                    </Grid>

                                                    {shouldRender &&
                                                        < Grid item md={6} xs={12}>
                                                            <SelectInput
                                                                label={translate("Caste")}
                                                                title="Caste"
                                                                id="caste"
                                                                name="caste"
                                                                options={casteOptions}
                                                            />
                                                        </Grid>
                                                    }
                                                </Grid>
                                            }

                                            {activeStep === 2 &&
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate('RegisteredVoter')}
                                                            title="Are You a Registered Voter in This Assembly Constituency, i.e. Is Your Name Listed in the Voters List?"
                                                            name="registeredVoter"
                                                            id="registeredVoter"
                                                            options={trueFalseOptions}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate('votedLastElection')} name="votedLastElection"
                                                            id="votedLastElection"
                                                            options={votedLastElectionOptions}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate('MaritalStatus')}
                                                            title="Are You Married?"
                                                            id="maritalStatus"
                                                            name="maritalStatus"
                                                            options={[{ label: translate('Single'), value: "1" }, { label: translate('Married'), value: "2" }]}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate('OccupationStatus')}
                                                            title="Can You Please Tell Me Your Occupation Status?"
                                                            id="occupationStatus"
                                                            name="occupationStatus"
                                                            options={[
                                                                { label: translate('Self-employed'), value: "1" },
                                                                { label: translate('Full-time'), value: "2" },
                                                                { label: translate('Part-time/freelancer'), value: "3" },
                                                                { label: translate('Home maker'), value: "4" }
                                                            ]}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate('MHI')}
                                                            title="What is the Monthly Household Income (MHI)."
                                                            id="monthlyHouseholdIncome"
                                                            name="monthlyHouseholdIncome"
                                                            options={incomeOptions}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate('OwnProperty')}
                                                            title="Is This Your Own Property?"
                                                            name="isOwnProperty"
                                                            id="isOwnProperty"
                                                            options={trueFalseOptions}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate("VoterID")}
                                                            title={translate('VoterIDPlaceholder')}
                                                            name="voterIdNumber"
                                                            type="text"
                                                            placeholder={translate('VoterIDPlaceholder')}
                                                        />
                                                        <div className='d-flex'>
                                                            <Button className='mx-2' type="button" onClick={() => setisCapturing(true)}>{translate('Capture')}</Button>
                                                            <FileUpload name="voterIdImage"
                                                                onInputChange={(event, newIndex) => handleInputChange(1, event, newIndex)}
                                                                selectedFile={selectedFile}
                                                            />
                                                        </div>
                                                        {capturedFile &&
                                                            <div className='my-2'>
                                                                <SmallImageCard imageUrl={capturedFile} />
                                                            </div>
                                                        }
                                                        {selectedFile &&
                                                            <div className='my-2'>
                                                                <h6 style={{ fontSize: '1rem', color: '#666' }}>{selectedFile.name}</h6>
                                                            </div>
                                                        }
                                                        {isCapturing &&
                                                            <CameraCapture setcapturedFile={(img) => (setcapturedFile(img), setisCapturing(false), setSelectedFile(""))} />
                                                        }

                                                        {formId && formsDetail &&
                                                            < SmallImageCard
                                                                imageUrl={`${import.meta.env.VITE_API_URL}/uploads/${formsDetail.voterIdImage || "Voter_Id_Image/no-image.png"}`}
                                                                onClick={() => window.open(`${import.meta.env.VITE_API_URL}/uploads/${formsDetail.voterIdImage || "Voter_Id_Image/no-image.png"}`, '_blank')}
                                                            />
                                                        }

                                                    </Grid>

                                                </Grid>
                                            }

                                            {activeStep === 3 &&
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                    <Grid item md={6} xs={12}>
                                                        <MultiSelectInput
                                                            label={translate('GovernmentSchemes')}
                                                            name="isParticipated"
                                                            value={formik.values.isParticipated}
                                                            options={governmentSchemesOptions}
                                                            setFieldValue={formik.setFieldValue}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate(`Category`)}
                                                            name="categoryFallUnder"
                                                            id="categoryFallUnder"
                                                            options={categoryOptions}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label={translate("ApplicantsAge")}
                                                            title="Please Provide Your Age Based On Your Last Birthday."
                                                            id="birthdayDate"
                                                            name="birthdayDate"
                                                            options={ageOptions}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate("dateOfBirth")}
                                                            title={translate('dateOfBirth')}
                                                            name="dateOfBirth"
                                                            type="date"
                                                            placeholder={translate('dateOfBirth')}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate("weddingDate")}
                                                            title={translate('weddingDate')}
                                                            name="weddingDate"
                                                            type="date"
                                                            placeholder={translate('weddingDate')}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label="Booth Number"
                                                            name="boothNumber"
                                                            type="text"
                                                            placeholder="Enter Booth Number"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <SelectInput
                                                            label="Constituency"
                                                            title="Choose Constituency"
                                                            name="constituency"
                                                            id="constituency"
                                                            options={constituencyOptions}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label="Ward Number"
                                                            name="wardNumber"
                                                            type="number"
                                                            placeholder="Enter Ward Number"
                                                        />
                                                    </Grid>

                                                </Grid>
                                            }

                                            {activeStep === 4 &&
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                    <Grid item xs={12} sx={{ mt: 1 }}>
                                                        <FieldArray
                                                            name="ageGroupOfMembers"
                                                            render={arrayHelpers => (
                                                                <div>
                                                                    <FieldArrayAddIcon
                                                                        label={translate("Information on Family Members")}
                                                                        arrayHelpers={arrayHelpers}
                                                                        object={{ name: '', age: '', gender: "", assembly: "", voterId: "", voterIdNum: "", voterIdImg: "" }}
                                                                    />
                                                                    {formik.values.ageGroupOfMembers.map((item, index) => (
                                                                        <Grid key={index} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                                                            <Grid item md={1} xs={12} style={{ display: "flex" }}>
                                                                                <FieldArrayRemoveIcon index={index} arrayHelpers={arrayHelpers} array={formik.values.ageGroupOfMembers} translate={translate} />
                                                                            </Grid>

                                                                            <Grid item md={2} xs={12}>
                                                                                <TextInput
                                                                                    label={translate("Members Name")}
                                                                                    name={`ageGroupOfMembers[${index}].name`}
                                                                                    type="text"
                                                                                    placeholder={translate("Members Name")}
                                                                                />
                                                                            </Grid>

                                                                            <Grid item md={1} xs={12}>
                                                                                <TextInput
                                                                                    label={translate("Age")}
                                                                                    name={`ageGroupOfMembers[${index}].age`}
                                                                                    type="number"
                                                                                    placeholder={translate("Age")}
                                                                                />
                                                                            </Grid>

                                                                            <Grid item md={1} xs={12}>
                                                                                <SelectInput
                                                                                    label={translate("Gender")}
                                                                                    id={`ageGroupOfMembers[${index}].gender`}
                                                                                    name={`ageGroupOfMembers[${index}].gender`}
                                                                                    options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                                                                                />
                                                                            </Grid>

                                                                            <Grid item md={2} xs={12}>
                                                                                <SelectInput
                                                                                    label={translate("Assembly/Constituency")}
                                                                                    name={`ageGroupOfMembers[${index}].assembly`}
                                                                                    id={`ageGroupOfMembers[${index}].assembly`}
                                                                                    options={constituencyOptions}
                                                                                />
                                                                            </Grid>

                                                                            <Grid item md={2} xs={12}>
                                                                                <SelectInput
                                                                                    label={translate("VoterID")}
                                                                                    id={`ageGroupOfMembers[${index}].voterId`}
                                                                                    name={`ageGroupOfMembers[${index}].voterId`}
                                                                                    options={[{ label: "Yes", value: 1 }, { label: "No", value: 0 }]}
                                                                                />
                                                                            </Grid>

                                                                            <Grid item md={2} xs={12}>
                                                                                <TextInput
                                                                                    label={translate("Voter ID Number")}
                                                                                    name={`ageGroupOfMembers[${index}].voterIdNum`}
                                                                                    type="text"
                                                                                    placeholder={translate("Voter ID Number")}
                                                                                />

                                                                                <div className='d-flex'>
                                                                                    <Button sx={{ mx: 2 }} type="button" onClick={() => (setisCapturing(true), setCapturingIndex(index))}>{translate('Capture')}</Button>
                                                                                    <FileUpload index={index} onInputChange={(event, newIndex) => handleInputChange(2, event, newIndex)} />
                                                                                </div>

                                                                                {(typeof inputValues[index] === "string") &&
                                                                                    <div className='my-2'> <SmallImageCard imageUrl={inputValues[index]} /></div>
                                                                                }

                                                                                {inputValues[index] &&
                                                                                    <div className='my-2'><h6 style={{ fontSize: '1rem', color: '#666' }}>{inputValues[index].name}</h6> </div>
                                                                                }
                                                                                {formId && formsDetail &&
                                                                                    <SmallImageCard
                                                                                        imageUrl={`${import.meta.env.VITE_API_URL}/uploads/${item.voterIdImg || "Voter_Id_Image/no-image.png"}`}
                                                                                    />
                                                                                }
                                                                            </Grid>

                                                                            {isSmallScreen ? <Box sx={{ borderBottom: 1 }} /> : ""}

                                                                            {(isCapturing && capturingIndex === index) &&
                                                                                <CameraCapture setcapturedFile={(img) => (handleInputChange(2, null, capturingIndex, img), setisCapturing(false))} />
                                                                            }
                                                                        </Grid>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <TextInput
                                                            label={translate('IsCelebrities')}
                                                            name="isCelebrities"
                                                            type="text"
                                                            placeholder=""
                                                        />
                                                    </Grid>

                                                    <Grid item md={6} xs={12}>
                                                        <Typography variant="h6" style={{ fontSize: "14px", fontWeight: "bold", textAlign: "left" }} gutterBottom>{translate('Picture of the location')}</Typography>
                                                        <div className='d-flex'>
                                                            <Button className='mx-2' type="button" onClick={() => setisLocationCapturing(true)}>{translate('Capture')}</Button>
                                                            <FileUpload name="locationPicture"
                                                                onInputChange={(event, newIndex) => handleInputChange(3, event, newIndex)}
                                                                selectedFile={selectedLocationFile}
                                                            />
                                                        </div>
                                                        {capturedLocationFile &&
                                                            <div className='my-2'>
                                                                <SmallImageCard imageUrl={capturedLocationFile} />
                                                            </div>
                                                        }
                                                        {selectedLocationFile &&
                                                            <div className='my-2'>
                                                                <h6 style={{ fontSize: '1rem', color: '#666' }}>{selectedLocationFile.name}</h6>
                                                            </div>
                                                        }
                                                        {isLocationCapturing &&
                                                            <CameraCapture setcapturedFile={(img) => (setcapturedLocationFile(img), setisLocationCapturing(false), setSelectedLocationFile(""))} />
                                                        }
                                                        {formId && formsDetail &&
                                                            <SmallImageCard
                                                                imageUrl={`${import.meta.env.VITE_API_URL}/uploads/${formsDetail.locationPicture || "Voter_Id_Image/no-image.png"}`}
                                                            />
                                                        }

                                                    </Grid>

                                                </Grid>
                                            }
                                        </div>
                                    }
                                    <div className='d-flex flex-row-reverse bd-highlight' style={{ float: "right" }}>
                                        {
                                            <Button variant='contained'
                                                type='submit'
                                                disabled={activeStep === 4 && formik.isSubmitting}
                                                style={{ textAlign: "right" }}
                                                sx={{ mt: 3, pl: 3, pr: 3 }}
                                            >
                                                {activeStep === 4 ? translate("Submit") : translate("Next")}
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

export default SurveyForm;