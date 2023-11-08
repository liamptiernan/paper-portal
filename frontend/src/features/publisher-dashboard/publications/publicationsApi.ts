import { createApi } from "@reduxjs/toolkit/query/react";
import { defaultFetchBaseQuery } from "../../../app/base-api";
import type { Publication } from "../types";

export const publicationsApi = createApi({
  reducerPath: "publicationsApi",
  baseQuery: defaultFetchBaseQuery(),
  tagTypes: ["Publication"],
  endpoints: (builder) => ({
    getAllPublications: builder.query<Publication[], void>({
      query: () => "/publications/",
      providesTags: (r) =>
        r
          ? [
              ...r.map(({ id }) => ({ type: "Publication" as const, id })),
              "Publication",
            ]
          : ["Publication"],
    }),
    createPublication: builder.mutation<Publication[], void>({
      query: () => ({
        url: "/publications/",
        method: "POST",
      }),
      invalidatesTags: ["Publication"],
    }),
  }),
});

export const { useGetAllPublicationsQuery, useCreatePublicationMutation } =
  publicationsApi;
