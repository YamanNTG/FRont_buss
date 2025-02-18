export type User = {
  name: string;
  _id: string;
  role: string;
  profileImage: string;
  email: string;
  lastActive: Date;
};

export type UserState = {
  user: User | null;
  users: User[];
  isLoading: boolean;
  isAuthenticated: boolean;
  msg: string;
  error: string;
};

export type UpdateProfilePayload = {
  name: string;
  email: string;
  profileImage: string;
};

export type UpdateProfileResponse = {
  msg: string | null;
};

export type UpdatePasswordResponse = {
  msg: string | null;
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
