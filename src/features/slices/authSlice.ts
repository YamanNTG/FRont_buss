import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  verifyToken,
  forgotPassword,
  resetPassword,
  logoutUser,
  inviteUser,
  verifyRegisterToken,
} from '../thunks/authThunk';
import { AuthState } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isVerified: false,
  msg: '',
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state: AuthState) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // Invite User
      .addCase(inviteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(inviteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })
      // VerifyToken
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = action.payload.msg;
        state.isVerified = action.payload.isVerified;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // VerifyRegisterToken
      .addCase(verifyRegisterToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyRegisterToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = action.payload.msg;
      })
      .addCase(verifyRegisterToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isVerified = action.payload.isVerified;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.msg = action.payload.msg;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.msg = action.payload.msg;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
