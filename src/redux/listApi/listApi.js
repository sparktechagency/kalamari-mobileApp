import { api } from "../api/baseApi";

export const listApi = api.injectEndpoints({
  overrideExisting: true, // Prevents duplicate endpoint errors
  endpoints: (builder) => ({
    // Bookmark endpoint
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
    getAllBookMark: builder.query({
      query: ({ type }) => ({
        url: `/get-bookmarks`,
        method: "GET",
        params: {
          type,
        },
      }),
      // Automatically refetch relevant queries after mutation
      providesTags: ["bookmarks"],
    }),
    searchByBookMark: builder.query({
      query: ({ search_have_it }) => ({
        url: `//search-have_it`,
        method: "GET",
        params: {
          search_have_it,
        },
      }),
      // Automatically refetch relevant queries after mutation
      providesTags: ["bookmarks"],
    }),
  }),
});

// Export hooks - fixed the hook name (should be Mutation not Query)
export const { useUserBookMarkMutation, useGetAllBookMarkQuery } = listApi;
