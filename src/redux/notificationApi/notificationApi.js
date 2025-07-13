import { api } from "../api/baseApi";

const notificationApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: "/get-notifications",
      }),
    }),
    providesTags: ["notification"],
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;
