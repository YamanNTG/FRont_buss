import axios from 'axios';

export const customFetch = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

customFetch.interceptors.request.use((config) => {
  console.log('Request config:', {
    url: config.url,
    method: config.method,
    data: config.data,
    baseURL: config.baseURL,
  });

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Optional: Add response interceptor for debugging
customFetch.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.error('Request failed:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  },
);
