import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '@/types/user';
import { showCurrentUser } from '../thunks/userThunk';
const initialState: UserState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
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
      });
  },
});
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
