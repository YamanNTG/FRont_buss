import { createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '@/utils/customFetch';
import { CreateIssuesData, IssuesItem } from '@/types/issues';
import { AxiosError } from 'axios';

export const createIssue = createAsyncThunk<any, CreateIssuesData>(
  'issues/createIssue',
  async (issueData: CreateIssuesData) => {
    try {
      const response = await customFetch.post('/api/v1/issues', issueData);
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to create issue',
      );
    }
  },
);

interface IssuesResponse {
  issues: IssuesItem[];
  count: number;
}

export const getAllIssues = createAsyncThunk<
  IssuesResponse, // What the thunk returns on success
  void, // First argument type (none in this case)
  { rejectValue: string } // Configuration including rejectValue type
>('issues/getAllIssues', async (_, { rejectWithValue }) => {
  try {
    const response = await customFetch.get('/api/v1/issues');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.msg || 'Get All Issues Failed',
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

type DeleteIssuesResponse = {
  msg: string;
};

export const deleteIssue = createAsyncThunk<
  DeleteIssuesResponse, // What the thunk returns on success
  string, // First argument type (none in this case)
  { rejectValue: string } // Configuration including rejectValue type
>('issues/deleteIssues', async (issueId, { rejectWithValue }) => {
  try {
    const response = await customFetch.delete(`/api/v1/issues/${issueId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.msg || 'Delete issue Failed',
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const getSingleIssue = createAsyncThunk<
  IssuesItem,
  string,
  { rejectValue: string }
>('issues/getSingleIssue', async (issueId, { rejectWithValue }) => {
  try {
    const response = await customFetch.get(`/api/v1/issues/${issueId}`);
    return response.data.issue;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch issue',
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const updateIssue = createAsyncThunk<
  { issues: IssuesItem },
  { issueId: string; issueData: Partial<IssuesItem> },
  { rejectValue: string }
>('issues/updateIssue', async ({ issueId, issueData }, { rejectWithValue }) => {
  try {
    const response = await customFetch.patch(
      `/api/v1/issues/${issueId}`,
      issueData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.msg || 'Update issue Failed',
      );
    }
    return rejectWithValue('An unexpected error occurred');
  }
});
