import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/slices/authSlice';
import issuesReducer from './features/slices/issuesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    issues: issuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
