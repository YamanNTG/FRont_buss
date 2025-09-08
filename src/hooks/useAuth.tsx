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
  const {
    logoutUser,
    resetPassword,
    forgotPassword,
    loginUser,
    verifyToken,
    verifyRegisterToken,
    registerUser,
    inviteUser,
  } = useAuthStore();

  return {
    logoutUser,
    resetPassword,
    forgotPassword,
    loginUser,
    verifyToken,
    verifyRegisterToken,
    registerUser,
    inviteUser,
  };
};
