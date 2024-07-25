import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    status: false,
    loading: false,
    error: null,
    msg: null,
    token: null,
    isVerified: false,
    data: null,
    singleUser: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        reset: (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = null;
            state.msg = null;
            state.token = null;
            state.isVerified = false;
            state.data = null;
        },
        userToUpdate: (state, action) => {
            const data = {
                _id: action.payload._id || "",
                displayName: action.payload.displayName || "",
                email: action.payload.email || "",
                userRole: action.payload.userRole || "",
                phoneNumber: action.payload.phoneNumber ||"",
                reportingAgent: action.payload.reportingAgent ||"",
                boothNumber: action.payload.boothNumber ||"",
                constituency: action.payload.constituency ||"",
                wardNumber: action.payload.wardNumber ||"",
            }
            state.singleUser = data;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAuthData.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.status = action.payload.status;
                    state.loading = false;
                    state.data = action.payload;
                    state.error = !action.payload.status;
                    state.msg = action.payload.msg;
                    state.token = action.payload.token || null;
                    // state.isVerified = action.payload.isVerified;
                    if (action.payload.token) {
                        localStorage.setItem("surveyApp", action.payload.token);
                    }
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = action.payload.msg;
                }
            })
            .addCase(fetchAuthData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = action.error.message;
            });
    },
});

export const fetchAuthData = createAsyncThunk('auth/fetchData', async (apiData) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("surveyApp"),
        };
        const { apiUrl, bodyOfRequest, method } = apiData
        let response
        if (method === 'GET') {
            response = await axios.get(apiUrl, { headers });
        } else if (method === 'POST') {
            response = await axios.post(apiUrl, bodyOfRequest, { headers });
        }
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const { reset, userToUpdate } = authSlice.actions
export default authSlice.reducer; 
