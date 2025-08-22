import { create } from 'zustand';
import { customFetch } from '@/utils/customFetch';
import { User } from '@/types/auth';

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
}));
