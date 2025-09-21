import { baseApi } from "../../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProduct: build.mutation({
      query: (productInfo) => ({
        url: "/product/add-product",
        method: "POST",
        data: productInfo,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    updateProduct: build.mutation({
      query: ({ productId, productInfo }) => ({
        url: `/product/${productId}`,
        method: "PUT",
        data: productInfo,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    getAllProduct: build.query({
      query: (params) => ({
        url: "/product/all-products",
        method: "GET",
        params,
      }),
      providesTags: ["PRODUCT"],
    }),
    getProduct: build.query({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
      providesTags: ["PRODUCT"],
    }),
    deleteProduct: build.mutation({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCT"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useUpdateProductMutation,
  useGetAllProductQuery,
  useGetProductQuery,
  useDeleteProductMutation,
} = productApi;
