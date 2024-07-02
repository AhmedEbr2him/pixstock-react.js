import { configureStore } from '@reduxjs/toolkit';
import clientSlice from './slices/clientSlice';
import mainSlice from './slices/mainSlice';

export const store = configureStore({
  reducer: {
    clientReducer: clientSlice,
    mainReducer: mainSlice,
  },
});
