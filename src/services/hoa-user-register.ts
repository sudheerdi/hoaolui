import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base = "http://localhost:8080/api";

export const hoaUserRegisterApi = createApi({
  reducerPath: "hoaUserRegister",
  baseQuery: fetchBaseQuery({
    baseUrl: `${base}/auth/`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    setHoaUserRegister: builder.mutation<userResponseType, userRequestType>({
      query: ({ ...postBody }) => ({
        url: "register",
        method: "POST",
        body: { ...postBody },
      }),
    }),
  }),
});

export const { useSetHoaUserRegisterMutation } = hoaUserRegisterApi;
