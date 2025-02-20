import { createSlice } from '@reduxjs/toolkit';
import { IssuesState } from '@/types/issues';
import {
  createIssue,
  getAllIssues,
  deleteIssue,
  getSingleIssue,
  updateIssue,
} from '../thunks/issuesThunk';
const initialState: IssuesState = {
  issues: [],
  count: 0,
  currentPage: 0,
  totalPages: 0,
  hasMore: false,
  isLoading: false,
  error: null,
  singleIssue: null,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // Create News cases
      .addCase(createIssue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issues.unshift(action.payload); // Add new issues to the beginning
        state.count += 1;
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Get All issues cases
      .addCase(getAllIssues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.currentPage === 1) {
          state.issues = action.payload.issues;
        } else {
          state.issues = [...state.issues, ...action.payload.issues];
        }
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(getAllIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Get Single issue cases
      .addCase(getSingleIssue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleIssue = action.payload;
      })
      .addCase(getSingleIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Update issue Cases
      .addCase(updateIssue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.singleIssue = action.payload;
          // Update the issue in the list if it exists
          const index = state.issues.findIndex(
            (item) => item._id === action.payload._id,
          );
          if (index !== -1) {
            state.issues[index] = action.payload;
          }
        } else {
          console.error(
            'Expected issue in payload, but it was undefined:',
            action.payload,
          );
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Delete issue cases
      .addCase(deleteIssue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteIssue.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default issuesSlice.reducer;
