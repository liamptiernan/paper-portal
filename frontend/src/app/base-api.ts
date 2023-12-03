import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { Auth0Client } from "@auth0/auth0-spa-js";

const domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId: string = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience: string = import.meta.env.VITE_AUTH0_AUDIENCE;
const baseUrl: string = import.meta.env.VITE_BASE_API_URL;

const client = new Auth0Client({
  domain: domain,
  clientId: clientId,
});

export const defaultFetchBaseQuery = (options: FetchBaseQueryArgs = {}) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: async function prepareHeaders(headers) {
      const token = await client.getTokenSilently({
        authorizationParams: { audience },
      });
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    ...options,
  });
};
