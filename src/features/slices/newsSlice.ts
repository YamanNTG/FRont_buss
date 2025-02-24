import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsState } from '@/types/news';
import {
  uploadFile,
  createNews,
  getAllNews,
  deleteNews,
  getSingleNews,
  updateNews,
} from '../thunks/newsThunk';

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
  extraReducers(builder) {
    builder
      // Upload File cases
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.image = action.payload.image;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Create News cases
      .addCase(createNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news.unshift(action.payload); // Add new news to the beginning
        state.count += 1;
      })
      .addCase(createNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Get All News cases
      .addCase(getAllNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.currentPage === 1) {
          state.news = action.payload.news;
        } else {
          state.news = [...state.news, ...action.payload.news];
        }
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Get Single News cases
      .addCase(getSingleNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleNews = action.payload.news;
      })
      .addCase(getSingleNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Update News Cases
      .addCase(updateNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleNews = action.payload.news;
        // Update the news in the list if it exists
        const index = state.news.findIndex(
          (item) => item._id === action.payload.news._id,
        );
        if (index !== -1) {
          state.news[index] = action.payload.news;
        }
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      })

      // Delete News cases
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

// Export the socket-related actions
export const { addNewsFromSocket, updateNewsFromSocket, removeNewsFromSocket } =
  newsSlice.actions;

export default newsSlice.reducer;
