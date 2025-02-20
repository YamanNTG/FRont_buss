import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
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

export default newsSlice.reducer;
