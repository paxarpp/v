import axios, { AxiosError } from 'axios';
import { ICoach } from '../pages/coaches/interfaces';
import { ICampItem } from '../pages/shortCamps/interfaces';
import { IContactBlock, IMainBlock } from '../pages/main/interfaces';
import { IUserInfo } from '../pages/user/interfaces';
import { IPass } from '../pages/user/info/modalPass';
import { IActivity, IReview } from '../pages/about/interfaces';

const BASE_URL = '/magicvolley';

export const getAppInfo = async <T>(): Promise<{
  data: { result: T; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/app_links');
  } catch (e: unknown) {
    return { data: { result: {} as T, error: (e as Error).message } };
  }
};

export const getHome = async <T>(): Promise<{
  data: { result: T; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/home');
  } catch (e: unknown) {
    return { data: { result: {} as T, error: (e as Error).message } };
  }
};

export const getTournaments = async <T>(): Promise<{
  data: { result: T; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/tournaments');
  } catch (e: unknown) {
    return { data: { result: {} as T, error: (e as Error).message } };
  }
};

export const getCorporates = async <T>(): Promise<{
  data: { result: T; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/corporates');
  } catch (e: unknown) {
    return { data: { result: {} as T, error: (e as Error).message } };
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

export const getBeachCoachesAll = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/coaches/all/beach-type');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const getClassicCoachesAll = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/coaches/all/classic-type');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
  }
};

export const getCamp = async <T>(
  id: string,
): Promise<{
  data: { result: T; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + `/camps/${id}`);
  } catch (e: unknown) {
    return { data: { result: {} as T, error: (e as Error).message } };
  }
};

export const getShedulePrice = async <T>(
  id: string,
): Promise<{
  data: { result: T; error?: string };
}> => {
  return await axios.get(BASE_URL + `/shedule/price/${id}`);
};

export const updateAbout = async <T>(
  data: unknown,
): Promise<{
  data: { result: T; error?: string };
}> => {
  return await axios.put(BASE_URL + '/about', data);
};

export const updateUserReservation = async <T>(data: {
  id?: string | null;
}): Promise<{
  data: { result: T; error?: string };
}> => {
  if (data.id) {
    return await axios.put(BASE_URL + '/users', data);
  } else {
    return await axios.post(BASE_URL + '/users/add-user', data);
  }
};

export const getUser = async <T>(
  id: string,
): Promise<{
  data: { result: T; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + `/profiles/${id}`);
  } catch (e: unknown) {
    return { data: { result: {} as T, error: (e as Error).message } };
  }
};

export const getAbout = async <T>(): Promise<{
  data: { result: T; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + `/about`);
  } catch (e: unknown) {
    return { data: { result: {} as T, error: (e as Error).message } };
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

export const getCoachesDropdown = async <T>(): Promise<{
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
    return await axios.put(BASE_URL + '/camp-user', {
      campId,
      userId,
    });
  } catch (e: unknown) {
    return { data: { result: false, error: (e as Error).message } };
  }
};

export const campReservationWithoutUser = async (
  campId: string,
  username: string,
  telephone: string,
): Promise<{
  data: { result: boolean; error?: string };
}> => {
  try {
    return await axios.put(BASE_URL + '/camp-user', {
      campId,
      userId: null,
      username,
      telephone,
    });
  } catch (e: unknown) {
    return { data: { result: false, error: (e as Error).message } };
  }
};

export const campConfirm = async (
  campId: string,
  userId: string,
  isConfirm: boolean,
): Promise<{
  data: { result: boolean; error?: string };
}> => {
  try {
    return await axios.put(BASE_URL + '/camp-user', {
      campId,
      userId,
      isConfirm,
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
  return await axios.delete(BASE_URL + `/questions/${id}`);
};

export const updateQuestion = async <T>(
  body: {
    question: string;
    answer: string;
    id?: string;
  }[],
): Promise<{ result: T; error: string }> => {
  const result: T = await axios.post(BASE_URL + `/questions`, body);
  return { result, error: '' };
};

export const updateUser = async <T>(
  body: IUserInfo,
): Promise<{ result: T; error: string }> => {
  const result: T = await axios.put(BASE_URL + `/profiles`, body);
  return { result, error: '' };
};

export const updateUserPass = async <T>(
  body: IPass,
): Promise<{ result: T; error: string }> => {
  const result: T = await axios.put(
    BASE_URL + `/profiles/update-password`,
    body,
  );
  return { result, error: '' };
};

export const updateMainBlock = async <T>(
  body: IMainBlock,
): Promise<{ result: T; error: string }> => {
  const result: T = await axios.put(BASE_URL + `/home/main`, body);
  return { result, error: '' };
};

export const updateContactBlock = async <T>(
  body: IContactBlock,
): Promise<{ result: T; error: string }> => {
  const result: T = await axios.put(BASE_URL + `/home/contact`, body);
  return { result, error: '' };
};

export const getQuestions = async <T>(): Promise<{
  questions: T[];
  error: string;
}> => {
  try {
    const {
      data: { result },
    } = await axios.get(BASE_URL + `/questions/all`);
    return { questions: result as T[], error: '' };
  } catch (e: unknown) {
    return { error: (e as { message: string }).message, questions: [] as T[] };
  }
};

export const login = async <T>(
  username: string,
  password: string,
): Promise<T> => {
  try {
    return await axios.post(BASE_URL + '/auth/login', {
      username,
      password,
    });
  } catch {
    return {} as T;
  }
};

export const signup = async <T>(
  username: string,
  password: string,
  telephone: string,
  confirmPassword: string,
): Promise<T> => {
  try {
    return await axios.post(BASE_URL + '/auth/signup', {
      username,
      password,
      telephone,
      confirmPassword,
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

export const getPastCamps = async <T>(): Promise<{
  data: { result: T[]; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/camps/past-all');
  } catch (e: unknown) {
    return { data: { result: [], error: (e as Error).message } };
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
  data: { result: T; error?: string };
}> => {
  try {
    return await axios.get(BASE_URL + '/shedule');
  } catch (e: unknown) {
    return { data: { result: {} as T, error: (e as Error).message } };
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
  return await axios.put(BASE_URL + `/coaches/${body.id}`, body);
};

export const uploadImg = async (file: FormData, typeEntity = 'COACH') => {
  return await axios.post(BASE_URL + '/media/upload', file, {
    params: { typeEntity },
  });
};

export const deleteCoach = async (id: string) => {
  return await axios.delete(BASE_URL + `/coaches/${id}`);
};

export const deleteUserReservation = async (id: string) => {
  return await axios.delete(BASE_URL + `/users/${id}`);
};

export const updateActivity = async (body: IActivity) => {
  if (body.images?.[0].entityId) {
    return await axios.put(
      BASE_URL + `/activity/${body.images[0].entityId}`,
      body,
    );
  } else {
    return await axios.post(BASE_URL + `/activity`, body);
  }
};

export const updateReview = async (body: IReview) => {
  if (body.image?.entityId) {
    return await axios.put(BASE_URL + `/review/${body.image.entityId}`, body);
  } else {
    return await axios.post(BASE_URL + `/review`, body);
  }
};

export const updateCampShort = async (body: ICampItem) => {
  if (body.id) {
    return await axios.put(BASE_URL + `/camps/${body.id}`, body);
  } else {
    return await axios.post(BASE_URL + `/camps/short`, body);
  }
};

export const updateShedulePrice = async (body: ICampItem) => {
  if (body.id) {
    return await axios.put(BASE_URL + `/shedule/price/${body.id}`, body);
  } else {
    return await axios.post(BASE_URL + `/shedule/price`, body);
  }
};

export const updateCampLong = async (body: ICampItem) => {
  if (body.id) {
    return await axios.put(BASE_URL + `/camps/${body.id}`, body);
  } else {
    return await axios.post(BASE_URL + `/camps/long`, body);
  }
};

export const deleteCamp = async (id: string) => {
  return await axios.delete(BASE_URL + `/camps/${id}`);
};

export const deleteShedulePrice = async (id: string) => {
  return await axios.delete(BASE_URL + `/shedule/price/${id}`);
};

export const deleteAct = async (id: string) => {
  return await axios.delete(BASE_URL + `/activity/${id}`);
};

export const deleteRvw = async (id: string) => {
  return await axios.delete(BASE_URL + `/review/${id}`);
};

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
