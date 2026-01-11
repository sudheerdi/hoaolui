import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";

const base = "http://localhost:8080/api";

export const hoaViolationsApi = createApi({
  reducerPath: "hoaViolations",
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
    getViolations: builder.query<ViolationsType, any>({
      query: () => ({
        url: "violations",
        method: "GET",
      }),
    }),
    getViolationDefaults: builder.query<ViolationDefaultsType, any>({
      query: () => ({
        url: "violations/defaults",
        method: "GET",
      }),
    }),
    createViolation: builder.mutation<
      ViolationResponseType,
      ViolationRequestType
    >({
      query: (payload) => ({
        url: "violations",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyGetViolationsQuery,
  useLazyGetViolationDefaultsQuery,
  useCreateViolationMutation,
} = hoaViolationsApi;
