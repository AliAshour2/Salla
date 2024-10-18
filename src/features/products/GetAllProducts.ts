import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your base URL for the API
const BASE_URL = 'https://ecommerce.routemistr.com';

// Create an API slice using RTK Query
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ limit = 20, sort = '-price', fields = 'title,price', page = 2, keyword = 'new', brand, minPrice, maxPrice, categories }) => {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit.toString());
        if (sort) params.append('sort', sort);
        if (fields) params.append('fields', fields);
        if (page) params.append('page', page.toString());
        if (keyword) params.append('keyword', keyword);
        if (brand) params.append('brand', brand);
        if (minPrice) params.append('price[gte]', minPrice.toString());
        if (maxPrice) params.append('price[lte]', maxPrice.toString());
        if (categories && categories.length > 0) {
          categories.forEach((category: string) => params.append('category[in]', category));
        }

        return `/api/v1/products?${params.toString()}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetAllProductsQuery } = productsApi;