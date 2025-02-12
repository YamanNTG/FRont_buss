import axios from 'axios';

export const customFetch = axios.create({
  baseURL: '',
  withCredentials: true,
});

// export const customFetch = axios.create({
//   baseURL: 'http://localhost:5000',
//   withCredentials: true,
// });

// Let the interceptor handle Content-Type dynamically
customFetch.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // For file uploads
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    // For regular JSON requests
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});
