import { api } from "../api/baseApi";

export const userReportApi = api.injectEndpoints({
  overrideExisting: true, // ✅ Add this line
  endpoints: (builder) => ({
    userBlock: builder.mutation({
      query: ({ blocked_id }) => ({
        url: "user-block",
        method: "POST",
        body: { blocked_id },
      }),
    }),
    userReport: builder.mutation({
      query: ({ reported_id, content }) => ({
        url: "user-report",
        method: "POST",
        body: { reported_id, content },
      }),
    }),
  }),
});
export const { useUserBlockMutation, useUserReportMutation } = userReportApi;
