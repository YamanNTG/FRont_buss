import { useIssuesStore } from '@/store/issues';
import { useEffect } from 'react';

export const useSingleIssue = () => {
  const { singleIssue, isLoading, error } = useIssuesStore();

  return {
    singleIssue,
    isLoading,
    error,
  };
};

// Fetch Single News
export const useLoadSingleIssue = (issueId: string) => {
  const { getSingleIssue } = useIssuesActions();

  useEffect(() => {
    if (issueId) {
      getSingleIssue(issueId);
    }
  }, [issueId]);
};

export const useIssuesList = () => {
  const {
    issues,
    count,
    currentPage,
    totalPages,
    hasMore,
    isLoading,
    error,
    activeIssuesCount,
    ongoingIssuesCount,
    resolvedIssuesCount,
  } = useIssuesStore();

  return {
    issues,
    count,
    currentPage,
    totalPages,
    hasMore,
    isLoading,
    error,
    activeIssuesCount,
    ongoingIssuesCount,
    resolvedIssuesCount,
  };
};

export const useIssuesActions = () => {
  const {
    createIssue,
    deleteIssue,
    updateIssue,
    getSingleIssue,
    getAllIssues,
    addIssueFromSocket,
    updateIssueFromSocket,
    removeIssueFromSocket,
  } = useIssuesStore();

  return {
    createIssue,
    deleteIssue,
    updateIssue,
    getSingleIssue,
    getAllIssues,
    addIssueFromSocket,
    updateIssueFromSocket,
    removeIssueFromSocket,
  };
};
