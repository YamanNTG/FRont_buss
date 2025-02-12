import axios from 'axios';

const isProd = window.location.hostname !== 'localhost';
const baseURL = isProd
  ? 'https://dbuss-api-025-8594a98bd0c9.herokuapp.com'
  : '';

export const customFetch = axios.create({
  baseURL,
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
