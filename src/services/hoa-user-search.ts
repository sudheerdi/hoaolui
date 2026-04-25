import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";

const base = "http://localhost:8080/api";

export const hoaUserSearchApi = createApi({
  reducerPath: "hoaUserSearch",
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
    getUsers: builder.query<any, any>({
      query: (address) => ({
        url: "members/search",
        method: "GET",
        params: { address },
      }),
    }),
    getMembers: builder.query<any, any>({
      query: () => ({
        url: "members",
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUsersQuery, useLazyGetMembersQuery } =
  hoaUserSearchApi;
