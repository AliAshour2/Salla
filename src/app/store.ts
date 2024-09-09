import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/token/tokenSlice'
import authReducer from '../features/auth/slices/authSlice'
// other imports

const store = configureStore({
  reducer: {
    token : tokenReducer,
    auth: authReducer
  },
 
});

export default store;