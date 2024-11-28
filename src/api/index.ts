import axios, { AxiosResponse, AxiosError } from 'axios';
import { ICoach } from '../pages/coaches/interfaces';
import { ICampItem } from '../pages/shortCamps/interfaces';

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

export const getCamp = async <T>(
  id: string,
): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + `/camps/${id}`);
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const getPackages = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/package-card/dropdown');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const getCoaches = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/coaches/all');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const campReservation = async (
  campId: string,
  userId: string,
): Promise<{
  data: { result: boolean; error?: string };
}> => {
  try {
    return await axios.put(BASE_URL + '/camp-user', null, {
      params: { campId, userId },
    });
  } catch (e: unknown) {
    return { data: { result: false, error: (e as Error).message } };
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

export const getShortCamps = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/camps/short-all');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};
export const getLongCamps = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/camps/long-all');
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

export const uploadImg = async (file: FormData, typeEntity = 'COACH') => {
  return await axios.post(BASE_URL + '/media/upload', file, {
    params: { typeEntity },
  });
};

export const deleteCoach = async (id: string) => {
  return await axios.delete(BASE_URL + `/coaches/${id}`);
};

export const updateCamp = async (body: ICampItem) => {
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
          // закрыть все открытые модалки
          window.location.reload();
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
