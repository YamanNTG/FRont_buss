import axios from 'axios';

export const customFetch = axios.create({
  baseURL: 'https://dbuss-api-025-8594a98bd0c9.herokuapp.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
