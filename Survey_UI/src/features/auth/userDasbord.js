import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let baseUrl = import.meta.env.VITE_API_URL;

export const userDashboard = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("surveyApp")
            if (token) {
                headers.set('authorization', `${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['users'],
    endpoints: (builder) => ({

        getSurveyForms: builder.mutation({
            query: (body) => ({
                url: body.endpoint,
                params: {
                    isOwnProperty: body.isOwnProperty.toString(),
                    maritalStatus: body.maritalStatus,
                    monthlyHouseholdIncome: body.monthlyHouseholdIncome,
                    occupationStatus: body.occupationStatus,
                    religion: body.religion,
                    caste: body.caste,
                    cweEducation: body.cweEducation,
                    startDate: body.startDate,
                    endDate: body.endDate
                },
                method: 'GET',
            }),
            transformResponse: (response, meta, arg) => response.data,
            transformErrorResponse: (response, meta, arg) => response.data || response.error,
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useGetSurveyFormsMutation } = userDashboard;
