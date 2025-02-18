import { createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/utils/customFetch';
import {
  User,
  UpdateProfilePayload,
  UpdateProfileResponse,
  UpdatePasswordPayload,
  UpdatePasswordResponse,
} from '@/types/user';
import { AxiosError } from 'axios';
export const showCurrentUser = createAsyncThunk<{ user: User }>(
  'user/showUser',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/api/v1/users/showMe');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Could not fetch user');
    }
  },
);

export const updateProfile = createAsyncThunk<
  UpdateProfileResponse, // Success type
  UpdateProfilePayload, // Payload type
  { rejectValue: string }
>( // Rejection type
  'user/updateProfile',
  async (
    { name, email, profileImage }: UpdateProfilePayload,
    { rejectWithValue },
  ) => {
    try {
      const response = await customFetch.patch('/api/v1/users/updateUser', {
        name,
        email,
        profileImage,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.msg || 'Profile Update Failed',
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const updatePassword = createAsyncThunk<
  UpdatePasswordResponse, // Success type
  UpdatePasswordPayload, // Payload type
  { rejectValue: string }
>( // Rejection type
  'user/updatePassword',
  async (
    { oldPassword, newPassword }: UpdatePasswordPayload,
    { rejectWithValue },
  ) => {
    try {
      const response = await customFetch.patch(
        '/api/v1/users/updateUserPassword',
        {
          oldPassword,
          newPassword,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.msg || 'Profile Update Failed',
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

interface ShowUsersResponse {
  users: User[];
}

export const showAllUsers = createAsyncThunk<
  ShowUsersResponse, // What the thunk returns on success
  void, // First argument type (none in this case)
  { rejectValue: string } // Configuration including rejectValue type
>('news/showAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await customFetch.get('/api/v1/users');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.msg || 'Get All Users Failed',
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});
