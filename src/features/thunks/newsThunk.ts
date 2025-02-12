import { createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/utils/customFetch';
import { CreateNewsData, NewsItem } from '@/types/news';

import { AxiosError } from 'axios';
interface UploadResponse {
  image: string;
}

export const uploadFile = createAsyncThunk<UploadResponse, File>(
  'news/uploadFile',
  async (image: File) => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      console.log('About to make request to:', '/api/v1/news/uploadImage');

      const response = await customFetch.post<UploadResponse>(
        '/api/v1/news/uploadImage',
        formData,
      );

      console.log('Response:', response);
      return response.data;
    } catch (err: unknown) {
      console.error('Upload error:', err);
      throw new Error('Failed to upload file');
    }
  },
);

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
