import { createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/utils/customFetch';
import { User } from '@/types/user';

export const showCurrentUser = createAsyncThunk<{ user: User }>(
  'user/showUser',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/api/v1/users/showMe');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Could not fetch user');
    }
  }
);
