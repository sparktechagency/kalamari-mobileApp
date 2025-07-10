import { api } from "../api/baseApi";

export const listApi = api.injectEndpoints({
  overrideExisting: true, // Prevents duplicate endpoint errors
  endpoints: (builder) => ({
    //  get book mark
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
      query: ({ search_have_it, type }) => ({
        url: `/search-have_it`,
        params: {
          type,
          search_have_it,
        },
      }),
      // Automatically refetch relevant queries after mutation
      providesTags: ["bookmarks"],
    }),
    getSinglePost: builder.query({
      query: ({ post_id }) => ({
        url: `/view-post`,
        method: "GET",
        params: {
          post_id,
        },
      }),
      // Automatically refetch relevant queries after mutation
      providesTags: ["bookmarks"],
    }),
    deletedBookMarkSinglePost: builder.mutation({
      query: ({ type, post_id }) => ({
        url: `/delete-have_it`,
        method: "DELETE", // Changed from "DELETED" to "DELETE"
        params: {
          post_id,
          type,
        },
      }),
      // Automatically refetch relevant queries after mutation
      invalidatesTags: ["bookmarks"],
    }),
  }),
});

// Export hooks - fixed the hook name (should be Mutation not Query)
export const {
  useGetAllBookMarkQuery,
  useGetSinglePostQuery,
  useSearchByBookMarkQuery,
  useDeletedBookMarkSinglePostMutation,
} = listApi;
