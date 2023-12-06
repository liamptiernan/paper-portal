import { createApi } from "@reduxjs/toolkit/query/react";
import { defaultFetchBaseQuery } from "../../app/base-api";
import type { User } from "./types";

interface UsersTableResponse {
  data: User[];
  count: number;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: defaultFetchBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UsersTableResponse, void>({
      query: () => "/users/",
      providesTags: (r) => {
        const tags = [
          { type: "User" as const, id: 0 },
          { type: "User" as const, id: "LIST" },
        ];
        r?.data.forEach(({ id }) => tags.push({ type: "User" as const, id }));
        return tags;
      },
    }),
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_r, _e, id) => [{ type: "User" as const, id }],
    }),
    updateUser: builder.mutation<User, User>({
      query: (body) => ({
        url: "/users/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: (_r, _e, body) => [
        { type: "User" as const, id: body.id },
      ],
    }),
    removeUserFromOrg: builder.mutation<User, number>({
      query: (id) => ({
        url: `/users/${id}/remove`,
        method: "POST",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "User" as const, id },
        { type: "User", id: "LIST" },
      ],
    }),
    deleteUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "User" as const, id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useRemoveUserFromOrgMutation,
  useDeleteUserMutation,
} = usersApi;
