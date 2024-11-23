import axios, { AxiosResponse, AxiosError } from 'axios';
import { ICoach } from '../pages/coaches/interfaces';
import { IShortCamp } from '../pages/shotCamp/interfaces';

const BASE_URL = '/magicvolley';

export const getMediaAll = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/media/all');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};
export const getCoachesAll = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/coaches/all');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};
export const getCampsAll = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/camps/all');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};
export const getCamp = async <T>(id: string): Promise<T> => {
  try {
    return await axios.get(BASE_URL + `/camps/${id}`);
  } catch {
    return {} as T;
  }
};
export const getCoach = async (id: string) => {
  return await axios.get(BASE_URL + `/coaches/${id}`);
};

export const getQuestionAll = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/questions/all');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const deleteQuestion = async <T>(id: string): Promise<T> => {
  try {
    return await axios.delete(BASE_URL + `/questions/${id}`);
  } catch {
    return {} as T;
  }
};
export const updateQuestion = async <T>(body: {
  question: string;
  answer: string;
  id?: string;
}): Promise<{ result: T; error: string }> => {
  try {
    if (body.id) {
      const result: T = await axios.put(
        BASE_URL + `/questions/${body.id}`,
        body,
      );
      return { result, error: '' };
    } else {
      const result: T = await axios.post(BASE_URL + `/questions`, body);
      return { result, error: '' };
    }
  } catch (e: unknown) {
    return { error: (e as { message: string }).message, result: {} as T };
  }
};
export const getQuestion = async <T>(
  id: string,
): Promise<{ question: T; error: string }> => {
  try {
    const {
      data: { result },
    } = await axios.get(BASE_URL + `/questions/${id}`);
    return { question: result as T, error: '' };
  } catch (e: unknown) {
    return { error: (e as { message: string }).message, question: {} as T };
  }
};

export const login = async <T>(
  username: string,
  password: string,
): Promise<T> => {
  try {
    return await axios.post(BASE_URL + '/auth/login', {
      username: username,
      password: password,
    });
  } catch {
    return {} as T;
  }
};
export const logout = async <T>(): Promise<T> => {
  try {
    return await axios.get(BASE_URL + '/auth/logout');
  } catch {
    return {} as T;
  }
};

export const getShotCamps = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.post(BASE_URL + '/camps/short');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const getShedule = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/shedule');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const getPrice = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/price');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const updateCoach = async (body: ICoach) => {
  if (body.id) {
    return await axios.put(BASE_URL + `/coaches/${body.id}`, body);
  } else {
    return await axios.post(BASE_URL + `/coaches`, body);
  }
};

export const deleteCoach = async (id: string) => {
  return await axios.delete(BASE_URL + `/coaches/${id}`);
};

export const updateCamp = async (body: IShortCamp) => {
  if (body.id) {
    return await axios.put(BASE_URL + `/camps/${body.id}`, body);
  } else {
    return await axios.post(BASE_URL + `/camps`, body);
  }
};

export const deleteCamp = async (id: string) => {
  return await axios.delete(BASE_URL + `/camps/${id}`);
};

export const creatorRequest =
  (logout: () => void) =>
  async <T>(axiosCall: Promise<AxiosResponse<{ result: T }>>) => {
    try {
      return { result: await axiosCall, error: '' };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          logout();
        }
        return {
          error:
            (error.response?.data.message as string) || 'Server Unavailable',
          result: {} as AxiosResponse<{ result: T }>,
        };
      }

      if (error instanceof Error) {
        return {
          error: error.message,
          result: {} as AxiosResponse<{ result: T }>,
        };
      }
      return {
        error: 'Server Unavailable',
        result: {} as AxiosResponse<{ result: T }>,
      };
    }
  };
