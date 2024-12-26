import { instance } from '.';

export const pl = {
  getAppInfo: async <T>(): Promise<{
    data: { result: T | null; error?: string };
  }> => {
    try {
      return await instance.get('/app_links');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getCamp: async <T>(
    id: string,
  ): Promise<{
    data: { result: T | null; error?: string };
  }> => {
    try {
      return await instance.get(`/camps/${id}`);
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getBeachCoachesAll: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get('/coaches/all/beach-type');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getHome: async <T>(): Promise<{
    data: { result: T | null; error?: string };
  }> => {
    try {
      return await instance.get<{ result: T | null; error?: string }>('/home');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getChildCamps: async <T>(): Promise<{
    data: { result: T | null; error?: string };
  }> => {
    try {
      return await instance.get('/childCamps');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getCampsAll: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get('/camps/all');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getClassicCoachesAll: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get('/coaches/all/classic-type');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getUser: async <T>(
    id: string,
  ): Promise<{
    data: { result: T | null; error?: string };
  }> => {
    try {
      return await instance.get(`/profiles/${id}`);
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getAbout: async <T>(): Promise<{
    data: { result: T | null; error?: string };
  }> => {
    try {
      return await instance.get(`/about`);
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getQuestionAll: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get('/questions/all');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getShortCamps: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get('/camps/short-all');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getLongCamps: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get('/camps/long-all');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getPastCamps: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get('/camps/past-all');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getShedule: async <T>(): Promise<{
    data: { result: T | null; error?: string };
  }> => {
    try {
      return await instance.get('/shedule');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
  getPrice: async <T>(): Promise<{
    data: { result: T[] | null; error?: string };
  }> => {
    try {
      return await instance.get('/price');
    } catch (e: unknown) {
      return { data: { result: null, error: (e as Error).message } };
    }
  },
};
