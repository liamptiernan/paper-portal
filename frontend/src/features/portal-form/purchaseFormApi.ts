import { createApi } from "@reduxjs/toolkit/query/react";
import { defaultFetchBaseQuery } from "../../app/base-api";
import { PublicAdOffering } from "./types";

export const purchaseFormApi = createApi({
  reducerPath: "purchaseFormApi",
  baseQuery: defaultFetchBaseQuery(),
  tagTypes: ["Config"],
  endpoints: (builder) => ({
    getAdOfferings: builder.query<PublicAdOffering[], string>({
      query: (publicationId) => `/purchase-form/config/${publicationId}`,
      providesTags: (_r, _e, id) => [{ type: "Config" as const, id }],
    }),
  }),
});

export const { useGetAdOfferingsQuery } = purchaseFormApi;
