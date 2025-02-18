import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '@/types/user';
import {
  showCurrentUser,
  updateProfile,
  updatePassword,
  showAllUsers,
} from '../thunks/userThunk';
const initialState: UserState = {
  user: null,
  users: [],
  isLoading: false,
  isAuthenticated: false,
  msg: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state: UserState) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      // Show All Users
      .addCase(showAllUsers.pending, (state) => {})
      .addCase(showAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(showAllUsers.rejected, (state, action) => {
        state.error = action.error.message ?? 'An error occurred';
      })
      // Show Current User
      .addCase(showCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(showCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = action.payload.msg ?? 'An error occurred';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = action.payload.msg ?? 'An error occurred';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
