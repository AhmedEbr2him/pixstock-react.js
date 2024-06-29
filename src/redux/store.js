import { configureStore } from '@reduxjs/toolkit';
import clientSlice from './slices/clientSlice';

export const store = configureStore({
  reducer: {
    clinetReducer: clientSlice,
  },
});
