import axios, { AxiosError } from 'axios';

export const HOST = import.meta.env.DEV
  ? ''
  : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}`;

const BASE_URL = `${HOST}/magicvolley`;
export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const creatorRequest =
  (logout: () => void, closable = true) =>
  async <T = unknown>(
    axiosCall: Promise<{
      data: { result: T; error?: string };
    }>,
  ) => {
    try {
      return { result: await axiosCall, error: null };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          logout();
          // закрыть все открытые модалки
          if (closable) {
            window.location.reload();
          }
        }
        return {
          error: error.response
            ? error.response.data.errorMessage || error.response.data.message
            : 'Server Unavailable',
          result: null,
        };
      }

      if (error instanceof Error) {
        return {
          error: error.message,
          result: null,
        };
      }
      return {
        error: 'Server Unavailable',
        result: null,
      };
    }
  };
