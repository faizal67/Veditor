import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import documentReducer from './slices/docSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    document: documentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['document/setContent'],
        ignoredPaths: ['document.content'],
      },
    }),
});

export default store;
