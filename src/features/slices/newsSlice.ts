import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsState } from '@/types/news';

const initialState: NewsState = {
  news: [],
  count: 0,
  currentPage: 0,
  totalPages: 0,
  hasMore: false,
  isLoading: false,
  error: null,
  image: '',
  singleNews: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // Add socket action to handle real-time news creation
    addNewsFromSocket: (state, action: PayloadAction<any>) => {
      const newNews = action.payload.news || action.payload;

      // Check if news already exists to prevent duplicates
      const newsExists = state.news.some((item) => item._id === newNews._id);

      if (!newsExists) {
        // Add new news to the beginning of the array
        state.news.unshift(newNews);
        state.count += 1;
      }
    },

    // Add socket action to handle real-time news updates
    updateNewsFromSocket: (state, action: PayloadAction<any>) => {
      const updatedNews = action.payload.news || action.payload;

      // Update in the news array if it exists
      const index = state.news.findIndex(
        (item) => item._id === updatedNews._id,
      );
      if (index !== -1) {
        state.news[index] = updatedNews;
      }

      // Also update singleNews if it's the same news being viewed
      if (state.singleNews && state.singleNews._id === updatedNews._id) {
        state.singleNews = updatedNews;
      }
    },

    // Add socket action to handle real-time news deletion
    removeNewsFromSocket: (state, action: PayloadAction<string>) => {
      const newsId = action.payload;

      // Filter out the deleted news
      state.news = state.news.filter((item) => item._id !== newsId);

      // Only decrease count if we actually removed something
      if (state.news.length < state.count) {
        state.count -= 1;
      }

      // Clear singleNews if it's the deleted news
      if (state.singleNews && state.singleNews._id === newsId) {
        state.singleNews = null;
      }
    },
  },
});

// Export the socket-related actions
export const { addNewsFromSocket, updateNewsFromSocket, removeNewsFromSocket } =
  newsSlice.actions;

export default newsSlice.reducer;
