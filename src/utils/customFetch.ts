import axios from 'axios';

export const customFetch = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customImageFetch = axios.create({
  baseURL: 'https://dbuss-api-025-8594a98bd0c9.herokuapp.com/',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
