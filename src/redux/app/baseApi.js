import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./services/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER", "PRODUCT", "CATEGORY", "ORDER"],
  endpoints: () => ({}),
});
