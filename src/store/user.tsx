import { create } from 'zustand';
import { customFetch } from '@/utils/customFetch';
import {
  User,
  UpdateProfilePayload,
  UpdatePasswordPayload,
} from '@/types/user';

interface UserStore {
  user: User | null;
  users: User[];
  isLoading: boolean;
  isAuthenticated: boolean;
  msg: string;
  error: string | null;
  //API actions
  showCurrentUser: () => Promise<User>;
  showAllUsers: () => Promise<User[]>;
  updateProfile: (params: UpdateProfilePayload) => Promise<{ msg: string }>;
  updatePassword: (params: UpdatePasswordPayload) => Promise<{ msg: string }>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  users: [],
  isLoading: false,
  isAuthenticated: false,
  msg: '',
  error: '',
  // methods to manipulate state
  showCurrentUser: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await customFetch.get('/api/v1/users/showMe');
      set({
        isLoading: false,
        user: response.data.user,
        isAuthenticated: true,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to show current user',
      });
    }
  },
  showAllUsers: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await customFetch.get('/api/v1/users');
      set({
        isLoading: false,
        users: response.data.users,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to show all users',
      });
    }
  },
  updateProfile: async (params: UpdateProfilePayload) => {
    const { name, email, profileImage } = params;
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await customFetch.patch('/api/v1/users/updateUser', {
        name,
        email,
        profileImage,
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
          error instanceof Error ? error.message : 'Failed to update Profile',
      });
    }
  },
  updatePassword: async (params: UpdatePasswordPayload) => {
    const { oldPassword, newPassword } = params;
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await customFetch.patch(
        '/api/v1/users/updateUserPassword',
        {
          oldPassword,
          newPassword,
        },
      );
      set({
        isLoading: false,
        msg: response.data.msg,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to update Password',
      });
    }
  },
}));
