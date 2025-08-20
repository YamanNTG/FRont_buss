import { create } from 'zustand';
import { customFetch, customImageFetch } from '@/utils/customFetch';
import { CreateNewsData, NewsItem } from '@/types/news';

interface GetAllNewsResponse {
  news: NewsItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

interface GetAllNewsParams {
  page?: number;
  limit?: number;
}

interface NewsStore {
  news: NewsItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  image: string;
  msg: string;
  singleNews: NewsItem | null;
  // API actions
  uploadFile: (image: File) => Promise<{ image: string }>;
  createNews: (newsData: CreateNewsData) => Promise<NewsItem>;
  updateNews: (
    newsId: string,
    newsData: Partial<NewsItem>,
  ) => Promise<NewsItem>;
  getSingleNews: (newsId: string) => Promise<NewsItem>;
  deleteNews: (newsId: string) => Promise<{ msg: string }>;
  getAllNews: (params: GetAllNewsParams) => Promise<GetAllNewsResponse>;
  // Socket actions
  addNewsFromSocket: (newNews: NewsItem) => void;
  updateNewsFromSocket: (updatedNews: NewsItem) => void;
  removeNewsFromSocket: (newsId: string) => void;
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  news: [],
  count: 0,
  currentPage: 0,
  totalPages: 0,
  hasMore: false,
  isLoading: false,
  error: null,
  image: '',
  msg: '',
  singleNews: null,
  // methods to manipulate the state
  uploadFile: async (image: File) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await customImageFetch.post(
        '/api/v1/news/uploadImage',
        formData,
      );
      set({ image: response.data.image, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to upload file',
      });
    }
  },
  createNews: async (newsData: CreateNewsData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customFetch.post('/api/v1/news', newsData);
      const newNewsItem = response.data;
      set((state) => ({
        isLoading: false,
        news: [newNewsItem, ...state.news],
        count: state.count + 1,
        error: null,
      }));
      return newNewsItem;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create news',
      });
    }
  },
  updateNews: async (newsId: string, newsData: Partial<NewsItem>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customFetch.patch(
        `/api/v1/news/${newsId}`,
        newsData,
      );
      const updatedNewsItems = response.data.news;

      set((state) => ({
        isLoading: false,
        singleNews: updatedNewsItems,
        news: state.news.map((item) =>
          item._id === newsId ? updatedNewsItems : item,
        ),
      }));
      return updatedNewsItems;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update news',
      });
    }
  },
  getSingleNews: async (newsId: string) => {
    console.log(newsId, 'id');

    set({ isLoading: true, error: null });
    try {
      const response = await customFetch.get(`/api/v1/news/${newsId}`);
      console.log(response);

      set({ isLoading: false, singleNews: response.data.news });
      return response.data.news;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to get single news',
      });
    }
  },
  deleteNews: async (newsId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await customFetch.delete(`/api/v1/news/${newsId}`);

      set({
        isLoading: false,
        msg: response.data.msg,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to delete single news',
      });
    }
  },
  getAllNews: async (params: GetAllNewsParams) => {
    const { page = 1, limit = 10 } = params;
    set({ isLoading: true, error: null });
    try {
      const response = await customFetch.get(
        `/api/v1/news?page=${page}&limit=${limit}`,
      );
      const { news, count, totalPages, currentPage, hasMore } = response.data;
      set((state) => ({
        isLoading: false,
        news: currentPage === 1 ? news : [...state.news, ...news],
        count,
        totalPages,
        currentPage,
        hasMore,
        error: null,
      }));
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to get all news',
      });
    }
  },
  addNewsFromSocket: (newNews: NewsItem) => {
    set((state) => {
      const newsExists = state.news.some((item) => item._id === newNews._id);

      if (!newsExists) {
        return {
          news: [newNews, ...state.news],
          count: state.count + 1,
        };
      }
      return state;
    });
  },
  updateNewsFromSocket: (updatedNews: NewsItem) => {
    set((state) => {
      const updatedNewsArray = state.news.map((item) =>
        item._id === updatedNews._id ? updatedNews : item,
      );

      const updatedSingleNews =
        state.singleNews && state.singleNews._id === updatedNews._id
          ? updatedNews
          : state.singleNews;

      return {
        news: updatedNewsArray,
        singleNews: updatedSingleNews,
      };
    });
  },
  removeNewsFromSocket: (newsId: string) => {
    set((state) => {
      const filteredNews = state.news.filter((item) => item._id !== newsId);

      // Check if the new list of items is < the count in the state, we reduce with 1 else just keep it as it is
      const newCount =
        filteredNews.length < state.count ? state.count - 1 : state.count;

      const updatedSingleNews =
        state.singleNews && state.singleNews._id === newsId
          ? null
          : state.singleNews;

      return {
        news: filteredNews,
        count: newCount,
        singleNews: updatedSingleNews,
      };
    });
  },
}));
