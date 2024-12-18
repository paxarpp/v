import { ICoach } from '../pages/coaches/interfaces';
import { ICampItem } from '../pages/shortCamps/interfaces';
import { IContactBlock, IMainBlock } from '../pages/main/interfaces';
import { IUserInfo } from '../pages/user/interfaces';
import { IPass } from '../pages/user/info/modalPass';
import { IActivity, IReview } from '../pages/about/interfaces';
import { instance } from '.';
import {
  IPrice,
  IShedule,
  ISheduleGroup,
} from '../pages/trainingSchedule/interfaces';

export const api = {
  updateAbout: async <T>(
    data: unknown,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put('/about', data);
  },
  updateUserReservation: async <T>(data: {
    id?: string | null;
  }): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (data.id) {
      return await instance.put('/users', data);
    } else {
      return await instance.post('/users/add-user', data);
    }
  },
  campReservation: async (
    campId: string,
    userId: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.put('/camp-user', {
      campId,
      userId,
    });
  },
  campReservationWithoutUser: async (
    campId: string,
    username: string,
    telephone: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.put('/camp-user', {
      campId,
      userId: null,
      username,
    });
  },
  campConfirm: async (
    campId: string,
    userId: string | null,
    isConfirm: boolean,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.put('/camp-user', {
      campId,
      userId,
      isConfirm,
    });
  },
  getCoach: async <T>(
    id: string,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.get(`/coaches/${id}`);
  },
  deleteQuestion: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/questions/${id}`);
  },
  updateQuestion: async <T>(
    body: {
      question: string;
      answer: string;
      id?: string;
    }[],
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.post('/questions', body);
  },
  updateUser: async <T>(
    body: IUserInfo,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put('/profiles', body);
  },
  updateUserPass: async <T>(
    body: IPass,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put('/profiles/update-password', body);
  },
  updateMainBlock: async <T>(
    body: IMainBlock,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put('/home/main', body);
  },
  updateContactBlock: async <T>(
    body: IContactBlock,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put('/home/contact', body);
  },
  getQuestions: async <T>(): Promise<{
    questions: T[];
    error: string;
  }> => {
    try {
      const {
        data: { result },
      } = await instance.get(`/questions/all`);
      return { questions: result as T[], error: '' };
    } catch (e: unknown) {
      return {
        error: (e as { message: string }).message,
        questions: [] as T[],
      };
    }
  },
  login: async <T>(username: string, password: string): Promise<T> => {
    try {
      return await instance.post('/auth/login', {
        username,
        password,
      });
    } catch {
      return {} as T;
    }
  },
  signup: async <T>(
    username: string,
    password: string,
    telephone: string,
    confirmPassword: string,
  ): Promise<T> => {
    try {
      return await instance.post('/auth/signup', {
        username,
        password,
        telephone,
        confirmPassword,
      });
    } catch {
      return {} as T;
    }
  },
  logout: async <T>(): Promise<T> => {
    try {
      return await instance.get('/auth/logout');
    } catch {
      return {} as T;
    }
  },
  updateCoach: async <T>(
    body: ICoach,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put(`/coaches/${body.id}`, body);
  },
  uploadImg: async <T>(
    file: FormData,
    typeEntity = 'COACH',
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.post('/media/upload', file, {
      params: { typeEntity },
    });
  },
  deleteCoach: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/coaches/${id}`);
  },
  deleteUserReservation: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/users/${id}`);
  },
  updateActivity: async <T>(
    body: IActivity,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (body.images?.[0].entityId) {
      return await instance.put(`/activity/${body.images[0].entityId}`, body);
    } else {
      return await instance.post('/activity', body);
    }
  },
  updateReview: async <T>(
    body: IReview,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (body.image?.entityId) {
      return await instance.put(`/review/${body.image.entityId}`, body);
    } else {
      return await instance.post('/review', body);
    }
  },
  updateCampShort: async <T>(
    body: ICampItem,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (body.id) {
      return await instance.put(`/camps/${body.id}`, body);
    } else {
      return await instance.post('/camps/short', body);
    }
  },
  updateShedulePrice: async <T>(
    body: IPrice,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (body.id) {
      return await instance.put(`/price/${body.id}`, body);
    } else {
      return await instance.post('/price', body);
    }
  },
  updateSheduleTrein: async <T>(
    body: ISheduleGroup,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (body.id) {
      return await instance.put(`/shedule/trein/${body.id}`, body);
    } else {
      return await instance.post('/shedule/trein', body);
    }
  },
  updateCampLong: async <T>(
    body: ICampItem,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (body.id) {
      return await instance.put(`/camps/${body.id}`, body);
    } else {
      return await instance.post('/camps/long', body);
    }
  },
  deleteCamp: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/camps/${id}`);
  },
  deleteShedulePrice: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/price/${id}`);
  },
  deleteSheduleTrein: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/shedule/trein/${id}`);
  },
  deleteAct: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/activity/${id}`);
  },
  deleteRvw: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/review/${id}`);
  },
  getPackages: async <T>(): Promise<{
    data: { result: T[]; error?: string };
  }> => {
    return await instance.get('/package-card/dropdown');
  },
  updatePackage: async <T>(body: {
    packageId: string | null;
  }): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (body.packageId) {
      return await instance.put('/package-card', body);
    } else {
      return await instance.post('/package-card', body);
    }
  },
  deletePackage: async (
    id: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.delete(`/package-card/${id}`);
  },
  getCoachesDropdown: async <T>(): Promise<{
    data: { result: T[]; error?: string };
  }> => {
    try {
      return await instance.get('/coaches/all');
    } catch (e: unknown) {
      return { data: { result: [], error: (e as Error).message } };
    }
  },
};
