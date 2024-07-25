import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
    displayName: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    phoneNumber: Yup.string()
        .length(10, 'Phone Number must be 10 characters')
        .required('Phone Number is required'),
});
export const updateUserSchema = Yup.object().shape({
    displayName: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    phoneNumber: Yup.string()
        .length(10, 'Phone Number must be 10 characters')
        .required('Phone Number is required'),
});

export const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

export const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
});
export const resetPasswordCode = Yup.object().shape({
    email:
        Yup.string()
            .length(6, 'Code must be 6 characters')
            .required('Required')
});