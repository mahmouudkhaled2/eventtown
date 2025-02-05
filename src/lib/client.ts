import { isClient } from '@/lib/utils';
import axios, { AxiosError } from 'axios';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${isClient() ? localStorage.getItem('token') : ''}`;

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const axiosError = error as AxiosError;
    const { response } = axiosError;

    if (response?.status === 401) {
      if (isClient()) {
        if (window.location.pathname !== '/login')
          window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);
export default instance;
