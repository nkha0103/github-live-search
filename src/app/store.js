import { configureStore } from '@reduxjs/toolkit';
import searhReducer from './component/features/search/searchSlide';

export const store = configureStore({
  reducer: {
    search: searhReducer
  },
});