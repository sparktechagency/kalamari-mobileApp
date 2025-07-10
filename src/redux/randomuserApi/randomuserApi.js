import { api } from "../api/baseApi";

const randomuserApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRandomuserUser: builder.query({
      query: ({ user_id }) => ({
        url: `/profile`,
        params: {
          user_id,
        },
      }),
      providesTags: ["randomuser"],
    }),
    getUserRandomuserFollowing: builder.query({
      query: ({ user_id }) => ({
        url: "/get-following", // This should match your Laravel route
        params: {
          user_id,
        },
      }),
      providesTags: ["profile"],
    }),
    getUserRandomuserFollowe: builder.query({
      query: ({ user_id }) => ({
        url: "/get-follower", // This should match your Laravel route
        params: {
          user_id,
        },
      }),
      providesTags: ["profile"],
    }),
    geRandomuserUserDiscoveryToggleFollow: builder.mutation({
      query: ({ user_id }) => ({
        url: "/discovery-toggle-follow", // This should match your Laravel route
        method: "POST",
        params: {
          user_id,
        },
      }),
      providesTags: ["profile"],
    }),

    getRandomuserUserPost: builder.query({
      query: ({ user_id }) => ({
        url: "/get-my-posts", // This should match your Laravel route
        params: {
          user_id,
        },
      }),
      providesTags: ["profile"],
    }),

    //
    getRandomAllBookMark: builder.query({
      query: ({ type, user_id }) => ({
        url: `/get-bookmarks`,
        method: "GET",
        params: {
          type,
          user_id,
        },
      }),
      // Automatically refetch relevant queries after mutation
      providesTags: ["bookmarks"],
    }),
  }),
});

export const {
  useGetRandomuserUserQuery,
  useGetRandomuserUserPostQuery,
  useGetUserRandomuserFollowingQuery,
  useGetUserRandomuserFolloweQuery,
  useGetRandomAllBookMarkQuery,
  useGeRandomuserUserDiscoveryToggleFollowMutation,
} = randomuserApi;
