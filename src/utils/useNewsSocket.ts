// hooks/useNewsSocket.ts
import { useEffect, useCallback } from 'react';
import { useDispatch } from '@/utils/hooks';
import { getSocket } from '../services/socketService';
import {
  addNewsFromSocket,
  updateNewsFromSocket,
  removeNewsFromSocket,
} from '@/features/slices/newsSlice'; // You'll need to create these actions

/**
 * Custom hook for handling socket events related to news
 * @returns Socket connection information
 */
export const useNewsSocket = () => {
  const dispatch = useDispatch();
  const socket = getSocket();

  // Setup event handlers for news-related socket events
  const setupNewsEvents = useCallback(() => {
    if (!socket) return;

    // Handle new news created event
    socket.on('newsCreated', (newNews) => {
      console.log('Socket: New news received:', newNews);
      dispatch(addNewsFromSocket(newNews));
    });

    // Handle news updated event
    socket.on('newsUpdated', (updatedNews) => {
      console.log('Socket: News updated:', updatedNews);
      dispatch(updateNewsFromSocket(updatedNews));
    });

    // Handle news deleted event
    socket.on('newsDeleted', (newsId) => {
      console.log('Socket: News deleted, ID:', newsId);
      dispatch(removeNewsFromSocket(newsId));
    });
  }, [dispatch, socket]);

  // Cleanup function for socket events
  const cleanupNewsEvents = useCallback(() => {
    if (!socket) return;

    socket.off('newsCreated');
    socket.off('newsUpdated');
    socket.off('newsDeleted');
  }, [socket]);

  useEffect(() => {
    setupNewsEvents();

    // Cleanup when component unmounts
    return () => {
      cleanupNewsEvents();
    };
  }, [setupNewsEvents, cleanupNewsEvents]);

  return {
    socket,
    isConnected: socket?.connected || false,
    socketId: socket?.id || null,
  };
};

export default useNewsSocket;
