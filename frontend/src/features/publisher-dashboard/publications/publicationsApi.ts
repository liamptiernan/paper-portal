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
    getPublication: builder.query<Publication, string>({
      query: (id) => `/publications/${id}`,
      providesTags: (_r, _e, id) =>
        id ? [{ type: "Publication" as const, id }] : [],
    }),
    updatePublication: builder.mutation<Publication, Publication>({
      query: (body) => ({
        url: "/publications/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: (_r, _e, body) => [
        { type: "Publication" as const, id: body.id },
      ],
    }),
    createPublication: builder.mutation<Publication, Partial<Publication>>({
      query: (body) => ({
        url: "/publications/",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Publication"],
    }),
  }),
});

export const {
  useGetAllPublicationsQuery,
  useGetPublicationQuery,
  useUpdatePublicationMutation,
  useCreatePublicationMutation,
} = publicationsApi;
