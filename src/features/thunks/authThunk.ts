import { createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/utils/customFetch';
import { RegisterUserData, User, InviteUserData } from '@/types/auth';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  registerInviteSchema,
} from '@/utils/schemas';
import { AxiosError } from 'axios';

type InviteResponse = {
  message: string;
};

export const inviteUser = createAsyncThunk<InviteResponse, InviteUserData>(
  'auth/register-invite',
  async (inviteData, { rejectWithValue }) => {
    try {
      // Validate data with Zod before sending
      const validatedData = registerInviteSchema.parse(inviteData);
      const response = await customFetch.post(
        '/api/v1/auth/register-invite',
        validatedData,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.msg || 'Password Reset Failed',
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

type VerifyRegisterTokenPayload = {
  inviteToken: string;
  email: string;
};

type VerifyRegisterTokenResponse = {
  msg: string | null;
};

export const verifyRegisterToken = createAsyncThunk<
  VerifyRegisterTokenResponse, // Success type
  VerifyRegisterTokenPayload, // Payload type
  { rejectValue: string }
>( // Rejection type
  'auth/verify-register-token',
  async (
    { inviteToken, email }: VerifyRegisterTokenPayload,
    { rejectWithValue },
  ) => {
    try {
      const response = await customFetch.post('/api/v1/auth/register-token', {
        inviteToken,
        email,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.msg || 'Login failed');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const registerUser = createAsyncThunk<{ user: User }, RegisterUserData>(
  'auth/register',
  async (userData) => {
    try {
      // Validate data with Zod before sending
      const validatedData = registerSchema.parse(userData);
      const response = await customFetch.post(
        '/api/v1/auth/register',
        validatedData,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
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
      validatedData,
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
    { rejectWithValue },
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
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (userEmail: String) => {
    try {
      // Validate data with Zod before sending
      const validatedData = forgotPasswordSchema.parse({ email: userEmail });
      const response = await customFetch.post(
        '/api/v1/auth/forgot-password',
        validatedData,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

type ResetPasswordPayload = {
  passwordToken: string;
  email: string;
  password: string;
};

type ResetPasswordResponse = {
  msg: string;
};

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordPayload,
  { rejectValue: string }
>(
  'auth/reset-password',
  async (
    { passwordToken, email, password }: ResetPasswordPayload,
    { rejectWithValue },
  ) => {
    try {
      const validatedPassword = resetPasswordSchema.parse({ password });
      const response = await customFetch.post('/api/v1/auth/reset-password', {
        passwordToken,
        email,
        password: validatedPassword.password,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.msg || 'Password Reset Failed',
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const logoutUser = createAsyncThunk<{ rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.delete('/api/v1/auth/logout');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.msg || 'Logout Failed');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);
