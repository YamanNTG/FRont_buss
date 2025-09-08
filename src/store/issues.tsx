import { create } from 'zustand';
import { customFetch } from '@/utils/customFetch';
import { CreateIssuesData, IssuesItem } from '@/types/issues';

interface IssuesStore {
  issues: IssuesItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  singleIssue: IssuesItem | null;
  activeIssuesCount: number;
  resolvedIssuesCount: number;
  // API Actions
  createIssue: (validatedIssueData: CreateIssuesData) => Promise<IssuesItem>;
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
  resolvedIssuesCount: 0,
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
}));
