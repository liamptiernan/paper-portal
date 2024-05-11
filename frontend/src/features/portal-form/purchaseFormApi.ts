import { createApi } from "@reduxjs/toolkit/query/react";
import { noAuthFetchBaseQuery } from "../../app/base-api";
import { PublicAdOffering, PublicPublication } from "./types";

export const purchaseFormApi = createApi({
  reducerPath: "purchaseFormApi",
  baseQuery: noAuthFetchBaseQuery(),
  tagTypes: ["AdOfferings", "Publication"],
  endpoints: (builder) => ({
    getPublicPublication: builder.query<PublicPublication, string>({
      query: (publicationId) =>
        `/purchase-form/config/${publicationId}/publication`,
      providesTags: (_r, _e, id) => [{ type: "Publication" as const, id }],
    }),
    getAdOfferings: builder.query<PublicAdOffering[], string>({
      query: (publicationId) =>
        `/purchase-form/config/${publicationId}/offerings`,
      providesTags: (_r, _e, id) => [{ type: "AdOfferings" as const, id }],
    }),
    uploadLogo: builder.mutation<string, FormData>({
      query: (formData) => ({
        url: "/purchase-form/upload/logo",
        method: "POST",
        body: formData,
      }),
    }),
    uploadAd: builder.mutation<string, FormData>({
      query: (formData) => ({
        url: "/purchase-form/upload/ad",
        method: "POST",
        body: formData,
      }),
    }),
    createCheckoutSession: builder.mutation<string, void>({
      query: () => ({
        url: "/purchase-form/create-checkout-session",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetPublicPublicationQuery,
  useGetAdOfferingsQuery,
  useUploadLogoMutation,
  useUploadAdMutation,
  useCreateCheckoutSessionMutation,
} = purchaseFormApi;
