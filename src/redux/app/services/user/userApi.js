import { baseApi } from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    updateUser: build.mutation({
      query: ({ userId, userInfo }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    getAllUsers: build.query({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    getSingleUser: build.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
} = userApi;
