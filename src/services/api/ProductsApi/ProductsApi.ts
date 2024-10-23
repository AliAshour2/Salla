import { Base_URL } from '@/constants';
import { GetSpecificProductResponse, TproductCartProps } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Define the API service
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: Base_URL }), 
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => {
        const {
          limit = 40,           // Default value for limit
          sort,
          fields,
          priceGte,
          priceLte,
          page = 1,             // Default value for page
          keyword,
          brand,
          categoryIn
        } = params || {};

        // Build the query string with optional params
        const queryParams = new URLSearchParams();

        if (limit) queryParams.append('limit', limit);
        if (sort) queryParams.append('sort', sort);
        if (fields) queryParams.append('fields', fields);
        if (priceGte) queryParams.append('price[gte]', priceGte);
        if (priceLte) queryParams.append('price[lte]', priceLte);
        if (page) queryParams.append('page', page);
        if (keyword) queryParams.append('keyword', keyword);
        if (brand) queryParams.append('brand', brand);
        if (categoryIn) {
          categoryIn.forEach((category: string) => queryParams.append('category[in]', category));
        }

        return {
          url: `api/v1/products?${queryParams.toString()}`,
          method: 'GET',
        };
      },
    }),
    getSpecificProduct: builder.query<TproductCartProps, string>({
      query: (id) => `/api/v1/products/${id}`,
      transformResponse: (response: GetSpecificProductResponse) => response.data,
    })
  }),
});

// Export the hook for the API query
export const { useGetAllProductsQuery , useGetSpecificProductQuery } = productsApi;
