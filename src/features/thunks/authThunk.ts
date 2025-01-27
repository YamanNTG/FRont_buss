import { createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/utils/customFetch';
import { RegisterUserData, User } from '@/types/auth';
import { registerSchema, loginSchema } from '@/utils/schemas';
import { AxiosError } from 'axios';

export const registerUser = createAsyncThunk<{ user: User }, RegisterUserData>(
  'auth/register',
  async (userData) => {
    try {
      // Validate data with Zod before sending
      const validatedData = registerSchema.parse(userData);
      const response = await customFetch.post(
        '/api/v1/auth/register',
        validatedData
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

type LoginResponse = {
  user: User;
  isVerified: boolean;
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const validatedData = loginSchema.parse(credentials);
    const response = await customFetch.post(
      '/api/v1/auth/login',
      validatedData
    );
    return response.data; // Returns { user: { name, userId, role }, isVerified: boolean }
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.msg || 'Login failed');
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

type VerifyTokenPayload = {
  verificationToken: string;
  email: string;
};

type VerifyResponse = {
  msg: string | null;
  isVerified: boolean;
};

export const verifyToken = createAsyncThunk<
  VerifyResponse, // Success type
  VerifyTokenPayload, // Payload type
  { rejectValue: string }
>( // Rejection type
  'auth/verify-email',
  async (
    { verificationToken, email }: VerifyTokenPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await customFetch.post('/api/v1/auth/verify-email', {
        verificationToken,
        email,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.msg || 'Login failed');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
