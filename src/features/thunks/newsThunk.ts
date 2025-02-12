import { createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/utils/customFetch';
import { CreateNewsData, NewsItem } from '@/types/news';

import { AxiosError } from 'axios';
interface UploadResponse {
  image: string;
}

export const uploadFile = createAsyncThunk<
  UploadResponse,
  File,
  { rejectValue: string }
>('news/uploadFile', async (image: File, { rejectWithValue }) => {
  try {
    // Add client-side validation
    if (!image.type.startsWith('image/')) {
      return rejectWithValue('Please upload an image file');
    }

    // Check file size (5MB)
    if (image.size > 5 * 1024 * 1024) {
      return rejectWithValue('Image size must be less than 5MB');
    }

    const formData = new FormData();
    formData.append('image', image);

    const response = await customFetch.post<UploadResponse>(
      '/api/v1/news/uploadImage',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Upload error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to upload image',
      );
    }
    return rejectWithValue('An unexpected error occurred during upload');
  }
});

export const createNews = createAsyncThunk<any, CreateNewsData>(
  'news/createNews',
  async (newsData: CreateNewsData) => {
    try {
      const response = await customFetch.post('/api/v1/news', newsData);
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to create news',
      );
    }
  },
);

interface NewsResponse {
  news: NewsItem[];
  count: number;
}

export const getAllNews = createAsyncThunk<
  NewsResponse, // What the thunk returns on success
  void, // First argument type (none in this case)
  { rejectValue: string } // Configuration including rejectValue type
>('news/getAllNews', async (_, { rejectWithValue }) => {
  try {
    const response = await customFetch.get('/api/v1/news');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.msg || 'Get All News Failed',
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

type DeleteNewsResponse = {
  msg: string;
};

export const deleteNews = createAsyncThunk<
  DeleteNewsResponse, // What the thunk returns on success
  string, // First argument type (none in this case)
  { rejectValue: string } // Configuration including rejectValue type
>('news/deleteNews', async (newsId, { rejectWithValue }) => {
  try {
    const response = await customFetch.delete(`/api/v1/news/${newsId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.msg || 'Delete news Failed');
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const getSingleNews = createAsyncThunk<
  { news: NewsItem },
  string,
  { rejectValue: string }
>('news/getSingleNews', async (newsId, { rejectWithValue }) => {
  try {
    const response = await customFetch.get(`/api/v1/news/${newsId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch news',
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const updateNews = createAsyncThunk<
  { news: NewsItem },
  { newsId: string; newsData: Partial<NewsItem> },
  { rejectValue: string }
>('news/updateNews', async ({ newsId, newsData }, { rejectWithValue }) => {
  try {
    const response = await customFetch.patch(
      `/api/v1/news/${newsId}`,
      newsData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.msg || 'Update news Failed');
    }
    return rejectWithValue('An unexpected error occurred');
  }
});
