export type User = {
  name: string;
  userId: string;
  role: string;
};

export type UserState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};
