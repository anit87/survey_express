import jwt from "jwt-decode";
const secret = import.meta.env.VITE_JWT_SECRET_KEY;

export const verifyUser = function (mytoken) {
    const localtoken = localStorage.getItem("surveyApp");
    try {
        const token = mytoken || localtoken;
        const decoded = jwt(token, secret);
        if (decoded) {
            return decoded;
        }
        localStorage.removeItem('surveyApp');
        return false;
    } catch (error) {
        console.error('Invalid token:', error.message);
        return false;
    }
};

export const capitalizeFirstLetter = (str) => {
    return typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};