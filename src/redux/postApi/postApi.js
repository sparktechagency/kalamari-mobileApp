import { api } from "../api/baseApi";

export const postApi = api.injectEndpoints({
  overrideExisting: true, //Prevents duplicate endpoint errors
  endpoints: (builder) => ({
    // Login
    shareMeal: builder.mutation({
      query: (formData) => ({
        url: "/share-meal",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

// Export hooks
export const { useShareMealMutation } = postApi;
