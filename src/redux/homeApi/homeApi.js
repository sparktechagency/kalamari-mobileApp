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
      query: ({ page, perPage } = {}) => ({
        url: `/discovery`,
        method: "GET",
        params: {
          page,
          per_page: perPage,
        },
      }),
      invalidatesTags: ["home"],
    }),
    // discoveryAllPost: builder.query({
    //   query: ({ page = 1, perPage = 10 } = {}) => ({
    //     url: `/discovery?per_page=${perPage}&page=${page}`,
    //     method: "GET",
    //     params: {
    //       page,
    //       per_page: perPage,
    //     },
    //   }),
    //   providesTags: ["home"],
    // }),
  }),
});

// Export hooks
export const { useSearchUserQuery, useDiscoveryAllPostQuery } = homeApi;
