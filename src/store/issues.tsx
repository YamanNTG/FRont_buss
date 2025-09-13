import { create } from 'zustand';
import { customFetch } from '@/utils/customFetch';
import { CreateIssuesData, IssuesItem, IssuesState } from '@/types/issues';

interface IssuesStore {
  issues: IssuesItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  msg: string;
  isLoading: boolean;
  error: string | null;
  singleIssue: IssuesItem | null;
  activeIssuesCount: number;
  ongoingIssuesCount: number;
  resolvedIssuesCount: number;
  // API Actions
  createIssue: (validatedIssueData: CreateIssuesData) => Promise<IssuesItem>;
  deleteIssue: (issueId: string) => Promise<{ msg: string }>;
  updateIssue: (
    issueId: string,
    issueData: Partial<IssuesItem>,
  ) => Promise<IssuesItem>;
  getSingleIssue: (issueId: string) => Promise<IssuesItem>;
  getAllIssues: ({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }) => Promise<Partial<IssuesState>>;
  addIssueFromSocket: (newIssue: IssuesItem) => void;
  updateIssueFromSocket: (updatedIssue: IssuesItem) => void;
  removeIssueFromSocket: (issueId: string) => void;
}

export const useIssuesStore = create<IssuesStore>((set, get) => ({
  issues: [],
  count: 0,
  currentPage: 0,
  totalPages: 0,
  hasMore: false,
  isLoading: false,
  error: null,
  singleIssue: null,
  activeIssuesCount: 0,
  ongoingIssuesCount: 0,
  resolvedIssuesCount: 0,
  msg: '',
  // methods to manipulate state
  createIssue: async (validatedIssueData: CreateIssuesData) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await customFetch.post(
        '/api/v1/issues',
        validatedIssueData,
      );
      const newIssuesItem = response.data;
      set((state) => ({
        isLoading: false,
        issues: [newIssuesItem, ...state.issues],
        count: state.count + 1,
      }));
      return newIssuesItem;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to create Issue',
      });
    }
  },
  deleteIssue: async (issueId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customFetch.delete(`/api/v1/issues/${issueId}`);
      set({
        isLoading: false,
        msg: response.data.msg,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to delete Issue',
      });
    }
  },
  updateIssue: async (issueId: string, issueData: Partial<IssuesItem>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customFetch.patch(
        `/api/v1/issues/${issueId}`,
        issueData,
      );
      const updatedIssueItems = response.data.issue;
      set((state) => ({
        isLoading: false,
        singleIssue: updatedIssueItems,
        issues: state.issues.map((item) =>
          item._id === issueId ? updatedIssueItems : item,
        ),
      }));
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to update Issue',
      });
    }
  },
  getSingleIssue: async (issueId: string) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await customFetch.get(`/api/v1/issues/${issueId}`);
      set({
        isLoading: false,
        singleIssue: response.data.issue,
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to get singleIssue',
      });
    }
  },
  getAllIssues: async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customFetch.get(
        `/api/v1/issues?page=${page}&limit=${limit}`,
      );
      const {
        issues,
        count,
        totalPages,
        currentPage,
        hasMore,
        totalActiveIssues,
        totalOngoingIssues,
        totalResolvedIssues,
      } = response.data;
      set((state) => ({
        isLoading: false,
        issues: currentPage === 1 ? issues : [...state.issues, ...issues],
        count,
        currentPage,
        totalPages,
        hasMore,
        activeIssuesCount: totalActiveIssues,
        ongoingIssuesCount: totalOngoingIssues,
        resolvedIssuesCount: totalResolvedIssues,
      }));
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to get all Issues',
      });
    }
  },
  addIssueFromSocket: (newIssue: IssuesItem) => {
    set((state) => {
      const issueExists = state.issues.some(
        (item) => item._id === newIssue._id,
      );

      if (!issueExists) {
        return {
          issues: [newIssue, ...state.issues],
          count: state.count + 1,
        };
      }
      return state;
    });
  },
  updateIssueFromSocket: (updatedIssue: IssuesItem) => {
    set((state) => {
      const updatedIssuesArray = state.issues.map((item) =>
        item._id === updatedIssue._id ? updatedIssue : item,
      );

      const updatedSingleIssue =
        state.singleIssue && state.singleIssue._id === updatedIssue._id
          ? updatedIssue
          : state.singleIssue;

      return {
        issues: updatedIssuesArray,
        singleIssue: updatedSingleIssue,
      };
    });
  },
  removeIssueFromSocket: (issueId: string) => {
    set((state) => {
      const filteredIssues = state.issues.filter(
        (item) => item._id !== issueId,
      );

      const newCount =
        filteredIssues.length < state.count ? state.count - 1 : state.count;

      const updatedSingleIssue =
        state.singleIssue && state.singleIssue._id === issueId
          ? null
          : state.singleIssue;

      return {
        issues: filteredIssues,
        count: newCount,
        singleIssue: updatedSingleIssue,
      };
    });
  },
}));
