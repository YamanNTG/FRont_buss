// services/socketService.ts
import { io, Socket } from 'socket.io-client';

// Create a singleton instance to ensure only one socket connection exists
let socket: Socket | null = null;

// Function to initialize the socket connection
export const initializeSocket = (): Socket => {
  if (!socket) {
    // Create the socket connection only if it doesn't exist
    socket = io('https://dbuss-api-025-8594a98bd0c9.herokuapp.com', {
      transports: ['websocket'],
      reconnection: true,
    });

    // Log when connection is established
    socket.on('connect', () => {
      console.log('Socket connected, ID:', socket?.id);
    });

    // Log any connection errors
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Log disconnection
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected, reason:', reason);
    });
  }

  return socket;
};

// Function to get the existing socket or create one if it doesn't exist
export const getSocket = (): Socket => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

// Properly disconnect the socket when needed
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket manually disconnected');
  }
};
