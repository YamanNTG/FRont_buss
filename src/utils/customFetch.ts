import axios from 'axios';

export const customFetch = axios.create({
  baseURL: '',
  withCredentials: true,
});

customFetch.interceptors.request.use((config) => {
  // For file uploads, override the baseURL to always use the direct Heroku URL
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
    config.baseURL = 'https://dbuss-api-025-8594a98bd0c9.herokuapp.com';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});
