import { configureStore } from '@reduxjs/toolkit';
import { creditApi } from '../features/creditApi';

export const store = configureStore({
  reducer: {
    [creditApi.reducerPath]: creditApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creditApi.middleware),
});