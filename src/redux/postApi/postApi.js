import { api } from "../api/baseApi";

export const postApi = api.injectEndpoints({
  overrideExisting: true, //Prevents duplicate endpoint errors
  endpoints: (builder) => ({
    // Login
    createPost: builder.mutation({
      query: (formData) => ({
        url: "/create-post", // This should match your Laravel route
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

// Export hooks
export const { useCreatePostMutation } = postApi;
