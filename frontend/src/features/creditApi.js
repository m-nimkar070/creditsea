import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const creditApi = createApi({
  reducerPath: 'creditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://creditsea-sywz.onrender.com/api' }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('xmlFile', file);
        return {
          url: '/upload',
          method: 'POST',
          body: formData,
          headers: {
            // Explicitly set content type for form data
            "Accept": "application/json",
          },
        };
      },
    }),
    getReport: builder.query({
      query: () => '/report',
    }),
  }),
});

export const { useUploadFileMutation, useGetReportQuery } = creditApi;