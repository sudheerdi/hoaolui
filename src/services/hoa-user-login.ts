import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base = "http://localhost:8080/api";

export const hoaUserLoginApi = createApi({
  reducerPath: "hoaUserLogin",
  baseQuery: fetchBaseQuery({
    baseUrl: `${base}/auth/`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    hoaUserLogin: builder.mutation<userLoginResponseType, userLoginRequestType>(
      {
        query: ({ ...postBody }) => ({
          url: "login",
          method: "POST",
          body: { ...postBody },
        }),
      }
    ),
  }),
});

export const { useHoaUserLoginMutation } = hoaUserLoginApi;
