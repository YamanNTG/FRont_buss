import { create } from 'zustand';
import { customFetch } from '@/utils/customFetch';
import { NewsItem } from '@/types/news';

interface NewsStore {
  news: NewsItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  image: string;
  singleNews: NewsItem | null;
  //--
  uploadFile: (image: File) => Promise<void>;
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
  singleNews: null,
  // methods to manipulate the state
  uploadFile: async (image: File) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await customFetch.post(
        '/api/v1/news/uploadImage',
        formData,
      );
      set({ image: response.data.image, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to upload file',
      });
    }
  },
}));
