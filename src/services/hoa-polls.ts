import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";

const base = "http://localhost:8080/api";

export const hoaPollsApi = createApi({
  reducerPath: "hoaPolls",
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
    createPoll: builder.mutation<PollsRequestType, any>({
      query: (requstData) => ({
        url: "polls/with-options",
        method: "POST",
        body: requstData,
      }),
    }),
    getPolls: builder.query<Poll[], void>({
      query: () => ({
        url: "polls",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePollMutation, useLazyGetPollsQuery } = hoaPollsApi;
