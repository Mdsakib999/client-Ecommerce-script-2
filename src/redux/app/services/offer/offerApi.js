import { baseApi } from "../../baseApi";

export const offerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addOffer: build.mutation({
      query: (images) => ({
        url: "/offer/add-offer",
        method: "POST",
        data: images,
      }),
      invalidatesTags: ["OFFER"],
    }),
    updateOffer: build.mutation({
      query: ({ offerId, images }) => ({
        url: `/offer/${offerId}`,
        method: "PUT",
        data: images,
      }),
      invalidatesTags: ["OFFER"],
    }),
    getAllOffers: build.query({
      query: () => ({
        url: "/offer/all-offers",
        method: "GET",
      }),
      providesTags: ["OFFER"],
    }),
    deleteOffers: build.mutation({
      query: (offerId) => ({
        url: `/offer/${offerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OFFER"],
    }),
  }),
});

export const {
  useAddOfferMutation,
  useUpdateOfferMutation,
  useGetAllOffersQuery,
  useDeleteOffersMutation,
} = offerApi;
