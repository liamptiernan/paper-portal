import { createApi } from "@reduxjs/toolkit/query/react";
import { defaultFetchBaseQuery } from "../../../app/base-api";
import type { AdOffering, Publication } from "../types";

interface PublicationsTableResponse {
  data: Publication[];
  count: number;
}

interface AdOfferingsTableResponse {
  data: AdOffering[];
  count: number;
}

export const publicationsApi = createApi({
  reducerPath: "publicationsApi",
  baseQuery: defaultFetchBaseQuery(),
  tagTypes: ["Publication", "Offering"],
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
    getPublicationAdOfferings: builder.query<AdOfferingsTableResponse, string>({
      query: (id) => `/publications/${id}/offerings/`,
      providesTags: (r) => {
        const tags = [
          { type: "Offering" as const, id: 0 },
          { type: "Offering" as const, id: "OFFERING-LIST" },
        ];
        r?.data.forEach(({ id }) =>
          tags.push({ type: "Offering" as const, id })
        );
        return tags;
      },
    }),
    getPublicationAdOffering: builder.query<AdOffering, string>({
      query: (id) => `/publications/offerings/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Offering" as const, id }],
    }),
    updatePublicationAdOffering: builder.mutation<AdOffering, AdOffering>({
      query: (body) => ({
        url: `/publications/offerings/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: (_r, _e, body) => [
        { type: "Offering" as const, id: body.id },
      ],
    }),
    createPublicationAdOffering: builder.mutation<
      AdOffering,
      Partial<AdOffering>
    >({
      query: (body) => ({
        url: `/publications/${body.publication_id}/offerings/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: [{ type: "Offering", id: "OFFERING-LIST" }],
    }),
    deletePublicationAdOffering: builder.mutation<AdOffering, number>({
      query: (id) => ({
        url: `/publications/offerings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "Offering" as const, id },
        { type: "Offering", id: "OFFERING-LIST" },
      ],
    }),
    updateAdOfferingOrder: builder.mutation<AdOffering[], number[]>({
      query: (order) => ({
        url: `/publications/offerings/reorder`,
        method: "POST",
        body: order,
      }),
      async onQueryStarted(_order, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedOfferings } = await queryFulfilled;
          console.log(updatedOfferings);
          dispatch(
            publicationsApi.util.updateQueryData(
              "getPublicationAdOfferings",
              "25",
              (draft) => {
                const newData = { data: updatedOfferings };
                Object.assign(draft, newData);
              }
            )
          );
        } catch {
          dispatch(
            publicationsApi.util.invalidateTags([
              { type: "Offering", id: "OFFERING-LIST" },
            ])
          );
        }
      },
    }),
  }),
});

export const {
  useGetAllPublicationsQuery,
  useGetPublicationQuery,
  useUpdatePublicationMutation,
  useCreatePublicationMutation,
  useDeletePublicationMutation,
  useGetPublicationAdOfferingsQuery,
  useGetPublicationAdOfferingQuery,
  useUpdatePublicationAdOfferingMutation,
  useCreatePublicationAdOfferingMutation,
  useDeletePublicationAdOfferingMutation,
  useUpdateAdOfferingOrderMutation,
} = publicationsApi;
