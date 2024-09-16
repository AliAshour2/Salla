import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/token/tokenSlice'
import authReducer from '../features/auth/slices/authSlice'

const store = configureStore({
  reducer: {
    token : tokenReducer,
    auth: authReducer
  },
 
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;