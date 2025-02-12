import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/slices/authSlice';
import userReducer from './features/slices/userSlice';
import newsReducer from './features/slices/newsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
