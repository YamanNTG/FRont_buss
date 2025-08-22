import { useAuthStore } from '@/store/auth';

export const useAuthUser = () => {
  const { user, isLoading, error, isAuthenticated, isVerified, msg, success } =
    useAuthStore();

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isVerified,
    msg,
    success,
  };
};

export const useAuthActions = () => {
  const { logoutUser } = useAuthStore();

  return {
    logoutUser,
  };
};
