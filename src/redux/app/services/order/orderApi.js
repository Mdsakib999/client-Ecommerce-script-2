import { baseApi } from "../../baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (orderInfo) => ({
        url: "/order/create-order",
        method: "POST",
        data: orderInfo,
      }),
      invalidatesTags: ["ORDER"],
    }),
    updateOrderStatus: build.mutation({
      query: ({ orderId, status }) => ({
        url: `/order/${orderId}`,
        method: "PUT",
        data: { status },
      }),
      invalidatesTags: ["ORDER"],
    }),
    deleteOrder: build.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ORDER"],
    }),
    getAllOrders: build.query({
      query: () => ({
        url: "/order/all-orders",
        method: "GET",
      }),
      providesTags: ["ORDER"],
      transformResponse: (response) => response.data,
    }),
    getMyOrders: build.query({
      query: (userId) => ({
        url: `/order/${userId}`,
        method: "GET",
      }),
      providesTags: ["ORDER"],
      transformResponse: (response) => response.data,
    }),
    trackOrder: build.query({
      query: (trackingId) => ({
        url: `/order/track/${trackingId}`,
        method: "GET",
      }),
      providesTags: ["ORDER"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useLazyTrackOrderQuery,
} = orderApi;
