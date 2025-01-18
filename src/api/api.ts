import { instance } from '.';
import { ICoach } from '../pages/coaches/interfaces';
import { ICampItem } from '../pages/shortCamps/interfaces';
import { ICampItem as ICampPastItem } from '../pages/camp/interfaces';
import { IContactBlock, IMainBlock } from '../pages/main/interfaces';
import { IUserInfo } from '../pages/user/interfaces';
import { IPass } from '../pages/user/info/modalPass';
import { IActivity, IReview } from '../pages/about/interfaces';
import { IPrice, ISheduleGroup } from '../pages/trainingSchedule/interfaces';

export const api = {
  updateAbout: async <T>(
    data: unknown,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put('/about', data);
  },
  addUser: async <T>(data: {
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
  updateUserReservation: async <T>(data: {
    id?: string | null;
  }): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (data.id) {
      return await instance.put('/camp-user', data);
    } else {
      return await instance.post('/camp-user/add-user', data);
    }
  },
  campReservation: async (
    campId: string,
    userId: string,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.post('/camp-user', {
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
    return await instance.post('/camp-user', {
      campId,
      userId: null,
      username,
      telephone,
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
  updateGallery: async (
    body: ICampPastItem,
  ): Promise<{
    data: { result: boolean; error?: string };
  }> => {
    return await instance.put(`/past-camps/${body.id}`, {
      gallery: body.gallery,
    });
  },
  updateUser: async <T>(
    body: IUserInfo,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put('/profiles', body);
  },
  updateUserAvatar: async <T>(
    body: unknown,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put('/profiles/update-avatar', body);
  },
  deleteUserAvatar: async <T>(
    id: string,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.delete(`/profiles/${id}/delete-avatar`);
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
  updateCoachVisible: async <T>(
    body: ICoach,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.put(`/coaches/visible/${body.id}`, {
      isVisible: body.isVisible,
    });
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
    if (body.id) {
      return await instance.put(`/activity/${body.id}`, body);
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
      return await instance.put(`/shedule/${body.id}`, body);
    } else {
      return await instance.post('/shedule', body);
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
  updateCampChild: async <T>(
    body: ICampItem,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    if (body.id) {
      return await instance.put(`/camps/${body.id}`, body);
    } else {
      return await instance.post('/camps/child', body);
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
  getCoachesMediaBeach: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get<{ result: T[] }>('/coaches/all/media/beach');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getCoachesMediaClassic: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get<{ result: T[] }>('/coaches/all/media/classic');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getShedule: async <T>(
    id: string,
  ): Promise<{
    data: { result: T; error?: string };
  }> => {
    return await instance.get(`/shedule/${id}`);
  },
  notification: {
    getNotifications: async <T>() => {
      try {
        return await instance.get<{ result: T[] | null }>('/notifications');
      } catch (e: unknown) {
        return { data: { result: null, error: (e as Error).message } };
      }
    },
    getNotificationCount: async () => {
      try {
        return await instance.get<{ result: number | null }>(
          '/notifications/count',
        );
      } catch (e: unknown) {
        return { data: { result: null, error: (e as Error).message } };
      }
    },
  },
};
