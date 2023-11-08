import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

export const defaultFetchBaseQuery = (options: FetchBaseQueryArgs = {}) => {
  // TODO not a hook pls
  //   const { getAccessTokenSilently } = useAuth0();
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    prepareHeaders: async function prepareHeaders(headers) {
      //   const token = await getAccessTokenSilently();
      //   headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    ...options,
  });
};
