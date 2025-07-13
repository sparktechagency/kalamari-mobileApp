import { api } from "../api/baseApi";

export const profileApi = api.injectEndpoints({
  overrideExisting: true, //Prevents duplicate endpoint errors
  endpoints: (builder) => ({
    // Login
    getUserFollowing: builder.query({
      query: ({ user_id }) => ({
        url: "/get-following", // This should match your Laravel route
        method: "GET",
        params: {
          user_id,
        },
      }),
      providesTags: ["profile"],
    }),
    getUserFollowe: builder.query({
      query: ({ user_id }) => ({
        url: "/get-follower", // This should match your Laravel route
        params: {
          user_id,
        },
      }),
      providesTags: ["profile"],
    }),

    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: "/update-user-profile",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),
    userBlockProfile: builder.mutation({
      query: ({ blocked_id }) => ({
        url: "/user-block",
        method: "POST",
        params: {
          blocked_id,
        },
      }),
      invalidatesTags: ["profile"],
    }),
    userReportPost: builder.mutation({
      query: ({ reported_id, content }) => ({
        url: "/user-report",
        method: "POST",
        params: {
          reported_id,
          content,
        },
      }),
      invalidatesTags: ["profile"],
    }),

    // Login
    getUserAllFollowing: builder.query({
      query: () => ({
        url: "/get-following", // This should match your Laravel route
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getUserAllFollowe: builder.query({
      query: () => ({
        url: "/get-follower", // This should match your Laravel route
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getMyAllPost: builder.query({
      query: () => ({
        url: "/get-my-posts", // This should match your Laravel route
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    deletedRecentPost: builder.mutation({
      query: ({ post_id }) => ({
        url: "/delete-recent", // This should match your Laravel route
        method: "DELETE",
        params: {
          post_id,
        },
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

// Export hooks
export const {
  useGetUserFollowingQuery,
  useGetUserFolloweQuery,
  useGetUserAllFollowingQuery,
  useGetUserAllFolloweQuery,
  useGetMyAllPostQuery,
  useUpdateUserProfileMutation,
  useUserBlockProfileMutation,
  useUserReportPostMutation,
  useDeletedRecentPostMutation,
} = profileApi;
