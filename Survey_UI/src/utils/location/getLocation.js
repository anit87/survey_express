import axios from "axios";

const googleApiKey = import.meta.env.VITE_GoogleApiKey;

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            axios
                .get(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`
                )
                .then((response) => {
                    if (response.data.status === 'OK') {
                        const results = response.data.results;
                        const location = results[0].formatted_address;
                        console.log(`Location: ${location}`);
                        resolve({location, latitude, longitude});
                    } else {
                        const errorMessage = `Geocoding API request failed: ${response.data.status}`;
                        console.error(errorMessage);
                        reject(errorMessage);
                    }
                })
                .catch((error) => {
                    console.error('Error making Geocoding API request:', error);
                    reject(`Error making Geocoding API request: ${error}`);
                });
        });
    });
};