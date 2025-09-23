import { create } from 'zustand';
import { customFetch } from '@/utils/customFetch';
import {
  ResetPasswordPayload,
  User,
  LoginResponse,
  LoginPayload,
  VerifyResponse,
  VerifyTokenPayload,
  VerifyRegisterTokenPayload,
  RegisterUserData,
  InviteUserData,
} from '@/types/auth';
import {
  forgotPasswordSchema,
  loginSchema,
  registerInviteSchema,
  registerSchema,
  resetPasswordSchema,
} from '@/utils/schemas';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  msg: string;
  success: boolean;
  // API actions
  logoutUser: () => Promise<void>;
  resetPassword: (params: ResetPasswordPayload) => Promise<{ msg: string }>;
  forgotPassword: (userEmail: string) => Promise<{ msg: string }>;
  loginUser: (credentials: LoginPayload) => Promise<LoginResponse>;
  verifyToken: ({
    verificationToken,
    email,
  }: VerifyTokenPayload) => Promise<VerifyResponse>;
  verifyRegisterToken: ({
    inviteToken,
    email,
  }: VerifyRegisterTokenPayload) => Promise<{ msg: string }>;
  registerUser: (userData: RegisterUserData) => Promise<{ msg: string }>;
  inviteUser: (inviteData: InviteUserData) => Promise<{ msg: string }>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isVerified: false,
  msg: '',
  success: false,
  // methods to manipulate state
  logoutUser: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      await customFetch.delete('/api/v1/auth/logout');
      set({
        isLoading: false,
        success: true,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to logout user',
      });
    }
  },
  resetPassword: async (params: ResetPasswordPayload) => {
    const { passwordToken, email, password } = params;
    set({
      isLoading: true,
      error: null,
    });
    try {
      const validatedPassword = resetPasswordSchema.parse({ password });
      const response = await customFetch.post('/api/v1/auth/reset-password', {
        passwordToken,
        email,
        password: validatedPassword.password,
      });
      set({
        isLoading: false,
        success: true,
        msg: response.data.msg,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to reset password',
      });
    }
  },
  forgotPassword: async (userEmail: string) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const validatedData = forgotPasswordSchema.parse({ email: userEmail });
      const response = await customFetch.post(
        '/api/v1/auth/forgot-password',
        validatedData,
      );
      set({
        isLoading: false,
        success: true,
        msg: response.data.msg,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to reset password',
      });
    }
  },
  loginUser: async (credentials: LoginPayload) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const validatedData = loginSchema.parse(credentials);
      const response = await customFetch.post(
        '/api/v1/auth/login',
        validatedData,
      );
      set({
        isLoading: false,
        user: response.data.user,
        isAuthenticated: true,
        isVerified: response.data.isVerified,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to login',
      });
    }
  },
  verifyToken: async ({ verificationToken, email }: VerifyTokenPayload) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await customFetch.post('/api/v1/auth/verify-email', {
        verificationToken,
        email,
      });
      set({
        isLoading: false,
        msg: response.data.msg,
        isVerified: response.data.isVerified,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to verify email',
      });
    }
  },
  verifyRegisterToken: async ({
    inviteToken,
    email,
  }: VerifyRegisterTokenPayload) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await customFetch.post('/api/v1/auth/register-token', {
        inviteToken,
        email,
      });
      set({
        isLoading: false,
        msg: response.data.msg,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to verify register token',
      });
    }
  },
  registerUser: async (userData: RegisterUserData) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const validatedData = registerSchema.parse(userData);
      const response = await customFetch.post(
        '/api/v1/auth/register',
        validatedData,
      );
      set({
        isLoading: false,
        msg: response.data.msg,
        success: true,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to register',
      });
    }
  },
  inviteUser: async (inviteData: InviteUserData) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const validatedData = registerInviteSchema.parse(inviteData);
      const response = await customFetch.post(
        '/api/v1/auth/register-invite',
        validatedData,
      );
      set({
        isLoading: false,
        msg: response.data.msg,
        success: true,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to invite user',
      });
    }
  },
}));
