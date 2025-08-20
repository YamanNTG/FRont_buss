import { useEffect, useCallback } from 'react';
import { useDispatch } from '@/utils/hooks';
import { getSocket } from '../services/socketService';
import { useNewsActions } from '@/hooks/useNews';

/**
 * Custom hook for handling socket events related to news
 */
export const useNewsSocket = () => {
  const dispatch = useDispatch();
  const socket = getSocket();
  const { addNewsFromSocket, updateNewsFromSocket, removeNewsFromSocket } =
    useNewsActions();

  // Setup event handlers for news-related socket events
  const setupNewsEvents = useCallback(() => {
    if (!socket) return;

    // Handle new news created event
    socket.on('newsCreated', (newNews) => {
      console.log('Socket: New news received:', newNews);
      addNewsFromSocket(newNews);
    });

    // Handle news updated event
    socket.on('newsUpdated', (updatedNews) => {
      console.log('Socket: News updated:', updatedNews);
      updateNewsFromSocket(updatedNews);
    });

    // Handle news deleted event
    socket.on('newsDeleted', (newsId) => {
      console.log('Socket: News deleted, ID:', newsId);
      removeNewsFromSocket(newsId);
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
