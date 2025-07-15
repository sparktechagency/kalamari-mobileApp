import { api } from "../api/baseApi";

const notificationApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: "/notification-stats",
      }),
      providesTags: ["notification"],
    }),
    getNotificationBySingleUser: builder.query({
      query: ({ user_id }) => ({
        url: `get-notifications?user_id=${user_id}`,
      }),
      providesTags: ["notification"],
    }),
    notificationRead: builder.mutation({
      query: ({ notification_id }) => ({
        url: `/read?notification_id=${notification_id}`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
    notificationReadAll: builder.mutation({
      query: () => ({
        url: `/read-all`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useGetNotificationBySingleUserQuery,
  useNotificationReadMutation,
  useNotificationReadAllMutation,
} = notificationApi;
