import axios from 'axios';

export const customFetch = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customImageFetch = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Credentials': 'true',
  },
});
