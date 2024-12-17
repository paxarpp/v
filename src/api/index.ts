import axios, { AxiosError } from 'axios';

const BASE_URL = '/magicvolley';
export const instance = axios.create({ baseURL: BASE_URL });

export { pl } from './pageLoader';
export { api } from './api';

export const creatorRequest =
  (logout: () => void) =>
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
          window.location.reload();
        }
        return {
          error:
            (error.response?.data.message as string) || 'Server Unavailable',
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
