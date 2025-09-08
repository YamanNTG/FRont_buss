import { useIssuesStore } from '@/store/issues';

export const useSingleIssue = () => {
  const { singleIssue, isLoading, error } = useIssuesStore();

  return {
    singleIssue,
    isLoading,
    error,
  };
};

export const useIssuesList = () => {
  const { issues, count, currentPage, totalPages, hasMore, isLoading, error } =
    useIssuesStore();

  return {
    issues,
    count,
    currentPage,
    totalPages,
    hasMore,
    isLoading,
    error,
  };
};

export const useIssuesActions = () => {
  const { createIssue } = useIssuesStore();

  return {
    createIssue,
  };
};
