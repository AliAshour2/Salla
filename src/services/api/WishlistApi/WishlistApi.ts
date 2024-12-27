import { Base_URL } from "@/constants";
import { TproductCartProps } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const WishListApi = createApi({
  reducerPath: "WishListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_URL,
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        headers.set("token", token);
      }
      return headers;
    },
  }),

  tagTypes: ["WishList"],

  endpoints: (builder) => ({
    AddProductToWishList: builder.mutation({
      query: (product: TproductCartProps) => ({
        url: "/api/v1/wishlist",
        method: "POST",
        body: { productId: product._id },
      }),

      invalidatesTags: ["WishList"],
        
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          WishListApi.util.updateQueryData('getWishList', undefined, draft => {
            draft.push(product);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

    }),

    removeProductFromWishList: builder.mutation({
      query: (product: TproductCartProps) => ({
        url: `/api/v1/wishlist/${product._id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["WishList"],
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          WishListApi.util.updateQueryData('getWishList', undefined, draft => {
            return draft.filter((p: TproductCartProps) => p._id !== product._id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      
    }),

    getWishList: builder.query({
      query: () => ({
        url: "/api/v1/wishlist",
        method: "GET",
      }),
      providesTags: ["WishList"],
    }),
  }),
});

export const {
  useAddProductToWishListMutation,
  useGetWishListQuery,
  useRemoveProductFromWishListMutation,
} = WishListApi;