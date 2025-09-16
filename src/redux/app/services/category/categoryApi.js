import { baseApi } from "../../baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCategory: build.mutation({
      query: (categoryName) => ({
        url: "/category/add-category",
        method: "POST",
        data: categoryName,
      }),
      invalidatesTags: ["CATEGORY"],
    }),
    updateCategory: build.mutation({
      query: ({ categoryId, categoryName }) => ({
        url: `/category/${categoryId}`,
        method: "PUT",
        data: categoryName,
      }),
      invalidatesTags: ["CATEGORY"],
    }),
    getAllCategories: build.query({
      query: () => ({
        url: "/category/all-categories",
        method: "GET",
      }),
      providesTags: ["CATEGORY"],
    }),
    deleteCategory: build.mutation({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CATEGORY"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} = categoryApi;
