import axios from 'axios';

export const customFetch = axios.create({
  baseURL: '',
  withCredentials: true,
});

customFetch.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});
