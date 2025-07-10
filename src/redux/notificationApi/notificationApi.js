import { api } from "../api/baseApi";

const notificationApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    userBlock: builder.mutation({
      query: ({ blocked_id }) => ({
        uri: "user-block",
        method: "POST",
        params: {
          blocked_id,
        },
      }),
      invalidatesTags: ["report"],
    }),
  }),
});

export const {} = notificationApi;
