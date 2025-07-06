import { api } from "../api/baseApi";

export const homeApi = api.injectEndpoints({
  overrideExisting: true, //Prevents duplicate endpoint errors
  endpoints: (builder) => ({
    // Login
    searchUser: builder.query({
      query: ({ user_name }) => ({
        url: `/user-search?user_name=${user_name}`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),
    discoveryAllPost: builder.query({
      query: ({ page, perPage = 10 } = {}) => ({
        url: `/discovery`,
        method: "GET",
        params: {
          page,
          per_page: perPage,
        },
      }),
      providesTags: ["home"],
    }),
    userDiscoveryAllPost: builder.query({
      query: () => ({
        url: `/discovery`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),
    userBookMark: builder.mutation({
      query: ({ post_id, type }) => ({
        url: `/toggle-bookmark`,
        method: "POST",
        body: {
          // Changed from params to body since it's a POST request
          post_id,
          type,
        },
      }),
      // Automatically refetch relevant queries after mutation
      invalidatesTags: ["bookmarks"],
    }),
  }),
});

// Export hooks
export const {
  useUserBookMarkMutation,
  useSearchUserQuery,
  useUserDiscoveryAllPostQuery,
  useDiscoveryAllPostQuery,
  useLazyDiscoveryAllPostQuery,
} = homeApi;
