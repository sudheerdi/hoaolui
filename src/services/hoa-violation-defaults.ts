import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";

const base = "http://localhost:8080/api";

export const hoaViolationDefaultsApi = createApi({
  reducerPath: "hoaViolationDefaults",
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
    getViolationDefaults: builder.mutation<any, any>({
      query: () => ({
        url: "violation-defaults",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetViolationDefaultsMutation } = hoaViolationDefaultsApi;
