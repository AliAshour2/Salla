import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import authReducer from "../features/auth/slices/authSlice";
import { productsApi } from "@/services/api/ProductsApi/ProductsApi";
import { WishListApi } from "@/services/api/WishlistApi/WishlistApi";
import { CartApi } from "@/services/api/cart/CartApi";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [WishListApi.reducerPath]: WishListApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      WishListApi.middleware,
      CartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
