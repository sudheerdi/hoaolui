import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";

const base = "http://localhost:8080/api";

export const hoaDocumentsApi = createApi({
  reducerPath: "hoaDocuments",
  baseQuery: fetchBaseQuery({
    baseUrl: `${base}/community/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).hoaUser.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDocumenmts: builder.query<any, any>({
      query: () => ({
        url: "documents",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    uploadDocument: builder.mutation<any, any>({
      query: (formData) => ({
        url: "documents/upload",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
});

export const { useLazyGetDocumenmtsQuery, useUploadDocumentMutation } =
  hoaDocumentsApi;
