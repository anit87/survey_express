import React, { useState, useEffect } from 'react';
import { Box, Grid, Container } from "@mui/material";
import { Formik, Form } from "formik";
import TextInput from '../../inputs/TextInput';
import SelectInput from '../../inputs/SelectInput';
import { verifyUser } from '../../../utils/functions/verifyUser';
import DataTable from '../../dataGrid/DataTable';
import SmallImageCard from '../../SmallImageCard';
import { useLanguageData } from '../../../utils/LanguageContext';
import {
    generategovernmentSchemesOptions,
    generateVotedLastElectionOptions,
    generatecategoryOptions,
    generatereligionOptions,
    generateCasteOptions,
    generateIncomeOptions,
    occupationOptios,
    generateEducationalOptions,
    generateTrueFalseOptions,
    generateageOptions,
    generateConstituencyOptions
} from '../../../utils/constants';

const apiUrl = import.meta.env.VITE_API_URL;

const SurveyForm = ({ activeStep, formsDetail }) => {
    const { translate } = useLanguageData();
    const incomeOptions = generateIncomeOptions(translate);
    const trueFalseOptions = generateTrueFalseOptions(translate);
    const educationalOptions = generateEducationalOptions(translate);
    const casteOptions = generateCasteOptions(translate);
    const religionOptions = generatereligionOptions(translate);
    const governmentSchemesOptions = generategovernmentSchemesOptions(translate);
    const ageOptions = generateageOptions(translate);
    const constituencyOptions = generateConstituencyOptions(translate);
    const categoryOptions = generatecategoryOptions(translate);
    const votedLastElectionOptions = generateVotedLastElectionOptions(translate);

    const [userId, setUserId] = useState(" ");
    let [counter, setCounter] = useState(0);

    useEffect(() => {
        const { id } = verifyUser();
        setUserId(id);
    }, [userId])
    useEffect(() => {
        setCounter(counter++);
    }, [formsDetail])

    return (
        <>
            <Container maxWidth="fixed">
                <Box sx={{ height: '100%', mt: 1 }} >
                    <Formik
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(false);
                        }}
                    >
                        {() => (
                            < Form >
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
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail ? formsDetail?.respondentName : ""}

                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label={translate('Address')}
                                                title="Please Enter Your Full Address"
                                                name="address"
                                                type="text"
                                                placeholder="Enter Your Full Mailing Address Here"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail ? formsDetail?.address : ""}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label={translate('Pincode')}
                                                title="Enter Your Area Pincode"
                                                name="pincode"
                                                type="number"
                                                placeholder="454545"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail ? formsDetail?.pincode : ""}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label={translate('MobileNumber')}
                                                title="Enter Your Mobile No"
                                                name="mobileNo"
                                                type="number"
                                                placeholder="9874563210"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail ? formsDetail?.mobileNo : ""}
                                            />
                                        </Grid>

                                        {formsDetail?.location &&
                                            <Grid item md={6} xs={12}>
                                                <TextInput
                                                    label={translate("Location")}
                                                    title=""
                                                    name="location"
                                                    type="text"
                                                    placeholder=""
                                                    editable={Boolean(formsDetail)}
                                                    textValue={formsDetail?.location.location}
                                                />
                                                <SmallImageCard
                                                    imageUrl={`${apiUrl}/uploads/${formsDetail?.locationPicture || "Voter_Id_Image/no-image.png"}`}
                                                    onClick={() => window.open(`${apiUrl}/uploads/${formsDetail?.locationPicture || "Voter_Id_Image/no-image.png"}`, '_blank')}
                                                />
                                            </Grid>
                                        }

                                    </Grid>
                                }

                                {activeStep === 1 &&
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label={translate("TotalMembers")}
                                                // label="How Many Members Are There in Your Family?"
                                                title="Total Number of Members in Your Family"
                                                name="totalMembers"
                                                type="number"
                                                placeholder="Total Members"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.totalMembers}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate("EducationDetailsCWE")}
                                                // label="Education Details of Chief Wage Earner (Head of the family)"
                                                title='I would now like to know the education level of the Chief Wage Earner (CWE) of your household. By Chief Wage Earner, I mean the person who contributes the maximum to the household income'
                                                id="chiefWageEarnereEducation"
                                                name="cweEducation"
                                                editable={Boolean(formsDetail)}
                                                textValue={educationalOptions.find(option => option.value == formsDetail?.cweEducation).label}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate("Religion")}
                                                title="Kindly Select Your Religion"
                                                id="religion"
                                                name="religion"
                                                editable={Boolean(formsDetail)}
                                                textValue={religionOptions.find(option => option.value == formsDetail?.religion).label}
                                            />
                                        </Grid>

                                        {formsDetail?.religion == 1 &&
                                            <Grid item md={6} xs={12}>
                                                <TextInput
                                                    label={translate("Caste")}
                                                    title="Caste"
                                                    name="caste"
                                                    placeholder="Kindly Indicate Your Caste"
                                                    editable={Boolean(formsDetail)}
                                                    textValue={formsDetail?.caste ? casteOptions.find(option => option.value == formsDetail?.caste).label : "N/A"}
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
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.registeredVoter == true ? translate("Yes") : translate("No")}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate('votedLastElection')}
                                                name="votedLastElection"
                                                id="votedLastElection"
                                                options={votedLastElectionOptions}
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.votedLastElection ? votedLastElectionOptions?.find(option => option.value == formsDetail?.votedLastElection)?.label : 'N/A'}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate('MaritalStatus')}
                                                title="Are You Married?"
                                                id="maritalStatus"
                                                name="maritalStatus"
                                                options={[{ label: translate('Single'), value: "1" }, { label: translate('Married'), value: "2" }]}
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail ? formsDetail?.maritalStatus == 1 ? translate('Single') : translate("Married") : ""}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate('OccupationStatus')}
                                                title="Can You Please Tell Me Your Occupation Status?"
                                                id="occupationStatus"
                                                name="occupationStatus"
                                                editable={Boolean(formsDetail)}
                                                textValue={translate(occupationOptios.find(option => option.value == (formsDetail?.occupationStatus || "")).label)}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate('MHI')}
                                                title="What is the Monthly Household Income (MHI)."
                                                id="monthlyHouseholdIncome"
                                                name="monthlyHouseholdIncome"
                                                editable={Boolean(formsDetail)}
                                                textValue={incomeOptions.find(option => option.value == (formsDetail?.monthlyHouseholdIncome || "")).label}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate('OwnProperty')}
                                                title="Is This Your Own Property?"
                                                name="isOwnProperty"
                                                id="isOwnProperty"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.isOwnProperty ? "Yes" : formsDetail?.isOwnProperty == 1 ? "Yes" : "No"}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label={translate("VoterID")}
                                                name="voterIdNumber"
                                                type="number"
                                                placeholder="Please Provide Your Voter ID Number"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.voterIdNumber || "N/A"}
                                            />

                                            <SmallImageCard
                                                imageUrl={`${apiUrl}/uploads/${formsDetail?.voterIdImage || "Voter_Id_Image/no-image.png"}`}
                                                onClick={() => window.open(`${apiUrl}/uploads/${formsDetail?.voterIdImage || "Voter_Id_Image/no-image.png"}`, '_blank')}
                                            />
                                        </Grid>

                                    </Grid>
                                }

                                {activeStep === 3 &&
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate('GovernmentSchemes')}
                                                name="isParticipated"
                                                id="isParticipated"
                                                options={trueFalseOptions}
                                                editable={Boolean(formsDetail)}
                                                textValue={governmentSchemesOptions
                                                    .filter(scheme => formsDetail?.isParticipated.includes(scheme.value))
                                                    .map(scheme => scheme.label)
                                                    .join(', ')}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate("ApplicantsAge")}
                                                title="Please Provide Your Age Based On Your Last Birthday."
                                                id="birthdayDate"
                                                name="birthdayDate"
                                                editable={Boolean(formsDetail)}
                                                textValue={ageOptions.find(option => option.value == (formsDetail?.birthdayDate || "")).label}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label={translate(`Category`)}
                                                name="categoryFallUnder"
                                                id="categoryFallUnder"
                                                options={categoryOptions}
                                                editable={Boolean(formsDetail)}
                                                textValue={categoryOptions.find(option => option.value == formsDetail?.categoryFallUnder).label}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label={translate("dateOfBirth")}
                                                name="dateOfBirth"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.dateOfBirth ? formsDetail?.dateOfBirth?.slice(0, 10) : 'N/A'}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label={translate("weddingDate")}
                                                name="weddingDate"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.weddingDate ? formsDetail?.weddingDate?.slice(0, 10) : 'N/A'}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="Booth Number"
                                                name="boothNumber"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.boothNumber ? formsDetail?.boothNumber : 'N/A'}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <SelectInput
                                                label="Constituency"
                                                title="Choose Constituency"
                                                name="constituency"
                                                id="constituency"
                                                editable={Boolean(formsDetail)}
                                                textValue={constituencyOptions?.find(option => option.value == formsDetail?.constituency)?.label}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label="Ward Number"
                                                name="wardNumber"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.wardNumber ? formsDetail?.wardNumber : 'N/A'}
                                            />
                                        </Grid>
                                    </Grid>
                                }

                                {activeStep === 4 &&
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item md={6} xs={12}>
                                            <TextInput
                                                label='Is there any celebrities, influencers, sports persons in the family?'
                                                name="isCelebrities"
                                                editable={Boolean(formsDetail)}
                                                textValue={formsDetail?.isCelebrities ? formsDetail?.isCelebrities : 'N/A'}
                                            />
                                        </Grid>

                                        <DataTable formsDetail={formsDetail?.ageGroupOfMembers} />

                                    </Grid>
                                }

                            </Form>
                        )}

                    </Formik >
                </Box>
            </Container >
        </>
    )
}

export default SurveyForm;