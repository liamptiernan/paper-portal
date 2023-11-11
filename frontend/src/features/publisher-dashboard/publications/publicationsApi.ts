import { createApi } from "@reduxjs/toolkit/query/react";
import { defaultFetchBaseQuery } from "../../../app/base-api";
import type { Publication } from "../types";

interface PublicationsTableResponse {
  data: Publication[];
  count: number;
}

export const publicationsApi = createApi({
  reducerPath: "publicationsApi",
  baseQuery: defaultFetchBaseQuery(),
  tagTypes: ["Publication"],
  endpoints: (builder) => ({
    getAllPublications: builder.query<PublicationsTableResponse, void>({
      query: () => "/publications/",
      providesTags: (r) => {
        const tags = [
          { type: "Publication" as const, id: 0 },
          { type: "Publication" as const, id: "LIST" },
        ];
        r?.data.forEach(({ id }) =>
          tags.push({ type: "Publication" as const, id })
        );
        return tags;
      },
    }),
    getPublication: builder.query<Publication, string>({
      query: (id) => `/publications/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Publication" as const, id }],
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
      invalidatesTags: [{ type: "Publication", id: "LIST" }],
    }),
    deletePublication: builder.mutation<Publication, number>({
      query: (id) => ({
        url: `/publications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "Publication" as const, id },
        { type: "Publication", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPublicationsQuery,
  useGetPublicationQuery,
  useUpdatePublicationMutation,
  useCreatePublicationMutation,
  useDeletePublicationMutation,
} = publicationsApi;
