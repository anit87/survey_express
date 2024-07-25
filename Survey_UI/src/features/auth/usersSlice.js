import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    status: false,
    loading: false,
    error: null,
    msg: null,
    data: null,
    singleUser: {}
}
 
const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        reset: (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = null;
            state.msg = null;
            state.data = null;
            state.singleUser = {};
        },
        userToUpdate: (state, action) => {
            const data = {
                _id: action.payload._id || "",
                displayName: action.payload.displayName || "",
                email: action.payload.email || "",
                userRole: action.payload.userRole || "",
                phoneNumber: action.payload.phoneNumber || "",
                reportingAgent: action.payload.reportingAgent || "",
            }
            state.singleUser = data
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUsersData.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.status = action.payload.status;
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = action.payload.msg;
                    state.data = action.payload;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = action.payload.msg;
                }
            })
            .addCase(fetchUsersData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = action.error.message;
            });
    },
});

export const fetchUsersData = createAsyncThunk('users/fetchData', async (apiData) => {
    try {
        const { apiUrl, bodyOfRequest, method } = apiData
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("surveyApp"),
        };
        let response
        const api = `${import.meta.env.VITE_API_URL}${apiUrl}`
        if (method === 'GET') {
            response = await axios.get(api, { headers });
        } else if (method === 'POST') {
            response = await axios.post(api, bodyOfRequest, { headers });
        }
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const { reset, userToUpdate } = usersSlice.actions
export default usersSlice.reducer; 
