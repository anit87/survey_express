import * as Yup from 'yup';

export const commercialFormSchema = Yup.object().shape({
    establishmentName: Yup.string(),
    establishmentType: Yup.string()
        .required('Type Of Establishment is a required'),
    natureOfBusiness: Yup.string(),
    contactPerson: Yup.string(),
    contactNumber: Yup.string()
        .length(10, 'Contact number must be 10 characters'),
});

export const surveyFormSchema = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    religion: Yup.string()
        .required('Please enter the required value.'),
    caste: Yup.string(),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),
    isParticipated: Yup.array()
        .min(1, 'Please select at least one option')
        .required('Please enter the required value.'),
    categoryFallUnder: Yup.string()
        .required('Please enter the required value.'),
    birthdayDate: Yup.string()
        .required('Please enter the required value.'),
    registeredVoter: Yup.string()
        .required('Please enter the required value.'),
    ageGroupOfMembers: Yup.array()
        .required('Please enter the required value.'),
    ageGroupOfMembers: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(2, 'Too Short').required('Required'),
                age: Yup.number().required('Required'),
                gender: Yup.string().required('Required'),
                assembly: Yup.string(),
                voterId: Yup.string().required('Required'),
                voterIdNum: Yup.string()
            })
        ).required('Required'),
    assemblyConstituencyMembers: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(2, 'Too Short'),
                age: Yup.number(),
                gender: Yup.string(),
                assemblyName: Yup.string().min(2, 'Too Short'),
            })
        ),
    voterIDsList: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().min(2, 'Too Short'),
                age: Yup.number(),
                gender: Yup.string(),
                assemblyName: Yup.string().min(2, 'Too Short'),
            })
        ),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),

});
export const surveyFormSchemaStep0 = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
});
export const surveyFormSchemaStep1 = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    religion: Yup.string()
        .required('Please enter the required value.'),
    caste: Yup.string(),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),

});

export const surveyFormSchemaStep2 = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    religion: Yup.string()
        .required('Please enter the required value.'),
    caste: Yup.string(),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),
    registeredVoter: Yup.string()
        .required('Please enter the required value.'),

});
export const surveyFormSchemaStep3 = Yup.object().shape({
    respondentName: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    pincode: Yup.string()
        .length(6, 'Pincode must be 6 characters')
        .required('Pincode is required'),
    mobileNo: Yup.string()
        .length(10, 'Mobile Number must be 10 characters')
        .required('Mobile Number is required'),
    isOwnProperty: Yup.string()
        .required('Please enter the required value.'),
    maritalStatus: Yup.string()
        .required('Please enter the required value.'),
    occupationStatus: Yup.string()
        .required('Please enter the required value.'),
    monthlyHouseholdIncome: Yup.string()
        .required('Please enter the required value.'),
    totalMembers: Yup.number()
        .required('Please enter the required value.'),
    religion: Yup.string()
        .required('Please enter the required value.'),
    caste: Yup.string(),
    cweEducation: Yup.string()
        .required('Please enter the required value.'),
    isParticipated: Yup.array()
        .min(1, 'Please select at least one option')
        .required('Please enter the required value.'),
    categoryFallUnder: Yup.string()
        .required('Please enter the required value.'),
    birthdayDate: Yup.string()
        .required('Please enter the required value.'),
    registeredVoter: Yup.string()
        .required('Please enter the required value.'),

});
