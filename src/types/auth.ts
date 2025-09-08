export type User = {
  name: string;
  userId: string;
  role: string;
};
export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  msg: string | null;
  success: boolean;
};

export type RegisterUserData = {
  name: string;
  email: string;
  password: string;
};
export type InviteUserData = {
  name: string;
  email: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type ResetPasswordPayload = {
  passwordToken: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  isVerified: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type VerifyTokenPayload = {
  verificationToken: string;
  email: string;
};

export type VerifyResponse = {
  msg: string | null;
  isVerified: boolean;
};

export type VerifyRegisterTokenPayload = {
  inviteToken: string;
  email: string;
};
