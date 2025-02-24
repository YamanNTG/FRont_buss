// hooks/useIssuesSocket.ts
import { useEffect, useCallback } from 'react';
import { useDispatch } from '@/utils/hooks';
import { getSocket } from '../services/socketService';
import {
  addIssueFromSocket,
  updateIssueFromSocket,
  removeIssueFromSocket,
} from '@/features/slices/issuesSlice';

/**
 * Custom hook for handling socket events related to issues
 * @returns Socket connection information
 */
export const useIssuesSocket = () => {
  const dispatch = useDispatch();
  const socket = getSocket();

  // Setup event handlers for issues-related socket events
  const setupIssueEvents = useCallback(() => {
    if (!socket) return;

    // Handle new issue created event
    socket.on('issueCreated', (newIssue) => {
      console.log('Socket: New issue received:', newIssue);
      dispatch(addIssueFromSocket(newIssue));
    });

    // Handle issue updated event
    socket.on('issueUpdated', (updatedIssue) => {
      console.log('Socket: Issue updated:', updatedIssue);
      dispatch(updateIssueFromSocket(updatedIssue));
    });

    // Handle issue deleted event
    socket.on('issueDeleted', (issueId) => {
      console.log('Socket: Issue deleted, ID:', issueId);
      dispatch(removeIssueFromSocket(issueId));
    });
  }, [dispatch, socket]);

  // Cleanup function for socket events
  const cleanupIssueEvents = useCallback(() => {
    if (!socket) return;

    socket.off('issueCreated');
    socket.off('issueUpdated');
    socket.off('issueDeleted');
  }, [socket]);

  useEffect(() => {
    setupIssueEvents();

    // Cleanup when component unmounts
    return () => {
      cleanupIssueEvents();
    };
  }, [setupIssueEvents, cleanupIssueEvents]);

  return {
    socket,
    isConnected: socket?.connected || false,
    socketId: socket?.id || null,
  };
};

export default useIssuesSocket;
