import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import transactionReducer from '../features/transactions/transactionSlice'
import { apiSlice } from '../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
