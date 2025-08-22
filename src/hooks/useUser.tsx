import { useUserStore } from '@/store/user';
import { useEffect } from 'react';

export const useSingleUser = () => {
  const { user, isAuthenticated, isLoading, msg, error } = useUserStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    msg,
    error,
  };
};

export const useUserList = () => {
  const { users, isLoading, error, msg } = useUserStore();

  return {
    users,
    isLoading,
    error,
    msg,
  };
};

export const userUserActions = () => {
  const { showCurrentUser, showAllUsers, updateProfile, updatePassword } =
    useUserStore();

  return {
    showCurrentUser,
    showAllUsers,
    updateProfile,
    updatePassword,
  };
};

export const useLoadUsers = () => {
  const { users } = useUserList();
  const { showAllUsers } = userUserActions();

  useEffect(() => {
    if (users.length === 0) {
      showAllUsers();
    }
  }, []);
};
