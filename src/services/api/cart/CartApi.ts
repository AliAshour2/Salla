import { Base_URL } from "@/constants";
import { TproductCartProps } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CartApi = createApi({
  reducerPath: "cartApi",
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
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    addProductToCart: builder.mutation({
      query: (product: TproductCartProps) => ({
        url: "/api/v1/cart",
        method: "POST",
        body: { productId: product._id },
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query({
      query: () => ({
        url: "/api/v1/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    removeProductFromCart: builder.mutation({
      query: (product: TproductCartProps) => ({
        url: `/api/v1/cart/${product._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    removeAllProductsFromCart: builder.mutation({
      query: () => ({
        url: `/api/v1/cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: (product: { _id: string; count: number }) => ({
        url: `/api/v1/cart/${product._id}`,
        method: "PUT",
        body: { count: product.count },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddProductToCartMutation,
  useGetCartQuery,
  useRemoveProductFromCartMutation,
  useRemoveAllProductsFromCartMutation,
  useUpdateCartMutation,
} = CartApi;