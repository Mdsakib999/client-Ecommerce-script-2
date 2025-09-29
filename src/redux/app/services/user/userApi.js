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
      // optimistic update
      async onQueryStarted({ userId, userInfo }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData("getAllUsers", undefined, (draft) => {
            const index = draft.findIndex((user) => user._id === userId);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...userInfo };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
} = userApi;
