import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";

const base = "http://localhost:8080/api";

export const hoaUnitsBulkUploadApi = createApi({
  reducerPath: "hoaUnitsBulkUpload",
  baseQuery: fetchBaseQuery({
    baseUrl: `${base}/community/members/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).hoaUser.token;
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "multipart/form-data");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    setUnitsBulkUpload: builder.mutation<any, any>({
      query: (formData) => ({
        url: "bulk-upload",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { useSetUnitsBulkUploadMutation } = hoaUnitsBulkUploadApi;
