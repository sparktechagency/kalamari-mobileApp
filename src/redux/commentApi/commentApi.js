import { api } from "../api/baseApi";

export const commentApi = api.injectEndpoints({
  overrideExisting: true, //Prevents duplicate endpoint errors
  endpoints: (builder) => ({
    // Login
    getUserComment: builder.query({
      query: ({ id }) => ({
        url: `/get-comments-with-replay-like?post_id=${id}`,
        method: "GET",
      }),
      providesTags: ["comment"],
    }),

    postUserComment: builder.mutation({
      query: (id) => ({
        url: `/create-comment`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["comment"],
    }),
    postLinkCount: builder.mutation({
      query: ({ comment_id }) => ({
        url: `/like?comment_id=${comment_id}`,
        method: "POST",
        // body: id,
      }),
      invalidatesTags: ["comment"],
    }),
    //reply comments
    replyComments: builder.mutation({
      query: ({ comment_id, replay }) => ({
        url: `/replay`,
        method: "POST",
        params: {
          comment_id,
          replay,
        },
      }),
      invalidatesTags: ["comment"],
    }),
    //reply comments
    postLike: builder.mutation({
      query: ({ post_id }) => ({
        url: `/toggle-heart`,
        method: "POST",
        params: {
          post_id,
        },
      }),
      invalidatesTags: ["comment"],
    }),
    //reply comments
    postCommentDeleted: builder.mutation({
      query: ({ comment_id }) => ({
        url: `/delete-comment`,
        method: "DELETE",
        params: {
          comment_id,
        },
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

// Export hooks
export const {
  useGetUserCommentQuery,
  usePostUserCommentMutation,
  usePostLinkCountMutation, //
  useReplyCommentsMutation, //
  usePostLikeMutation, //
  usePostCommentDeletedMutation, //
} = commentApi;
