import { baseApi } from "../../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProduct: build.mutation({
      query: (productInfo) => ({
        url: "/product/add-product",
        method: "POST",
        data: productInfo,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ productId, productInfo }) => ({
        url: `/product/${productId}`,
        method: "PUT",
        data: productInfo,
      }),
    }),
    getAllProduct: build.query({
      query: () => "/product/all-products",
    }),
    getProduct: build.query({
      query: (productId) => `/product/${productId}`,
    }),
    deleteProduct: build.mutation({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
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
