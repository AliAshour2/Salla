import { Base_URL } from "@/constants";
import { TproductCartProps } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const WishListApi = createApi({
  reducerPath: "WishListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_URL,
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("userToken");
      console.log(token);
      if (token) {
        headers.set("token", token);
        console.log(token);
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
    }),

    removeProductFromWishList: builder.mutation({
      query: (product: TproductCartProps) => ({
        url: `/api/v1/wishlist/${product._id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["WishList"],
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
