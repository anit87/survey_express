import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let baseUrl = import.meta.env.VITE_API_URL;

export const comercial = createApi({
    reducerPath: 'commercial',
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
    tagTypes: ['commercial'],
    endpoints: (builder) => ({
        postcomercialForm: builder.mutation({
            query: (body) => ({
                url: `commercial`,
                method: 'POST',
                body,
            }),
            transformResponse: (response, meta, arg) => response,
            transformErrorResponse: (response, meta, arg) => response.data,
            invalidatesTags: ['commercial'],
        }),
    }),
});

export const { usePostcomercialFormMutation } = comercial;
