import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";

const base = "http://localhost:8080/api";

export const hoaUnitsApi = createApi({
  reducerPath: "hoaUnits",
  baseQuery: fetchBaseQuery({
    baseUrl: `${base}/community/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).hoaUser.token;
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUnits: builder.query<any, any>({
      query: () => ({
        url: "units",
        method: "GET",
      }),
    }),
    setUnitsBulkUpload: builder.mutation<any, any>({
      query: (formData) => ({
        url: "bulk",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { useLazyGetUnitsQuery, useSetUnitsBulkUploadMutation } =
  hoaUnitsApi;
