import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// Function to initialize the socket connection
export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(import.meta.env.VITE_HEROKU_URL, {
      transports: ['websocket'],
      reconnection: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected, ID:', socket?.id);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected, reason:', reason);
    });
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket manually disconnected');
  }
};
