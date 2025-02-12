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
// export const customFetch = axios.create({
//   baseURL: 'http://localhost:5000',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
