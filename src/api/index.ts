import axios, { Axios } from "axios";
import { IShedule } from "../pages/trainingSchedule/interfaces";

const BASE_URL = '/magicvolley';

export const getMediaAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get(BASE_URL + '/media/all')
  } catch {
    return { data: { result: [] }};
  }
}
export const getCoachesAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get(BASE_URL + '/coaches/all')
  } catch {
    return { data: { result: [] }};
  }
}
export const getCampsAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get(BASE_URL + '/camps/all')
  } catch {
    return { data: { result: [] }};
  }
}
export const getCamp = async <T,>(id: string): Promise<T> => {
  try {
    return await axios.get(BASE_URL + `/camps/${id}`)
  } catch {
    return {} as T;
  }
}
export const getCoach = async <T,>(id: string): Promise<T> => {
  try {
    return await axios.get(BASE_URL + `/coaches/${id}`)
  } catch {
    return {} as T;
  }
}

export const getQuestionAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get(BASE_URL + '/questions/all')
  } catch (e) {
    return { data: { result: [] }}; 
  }
}

export const deleteQuestion = async <T,>(id: string): Promise<T> => {
  try {
   return await axios.delete(BASE_URL + `/questions/${id}`)
 } catch {
   return {} as T;
 }
};
export const updateQuestion = async <T,>(body: {question: string; answer: string; id?: string }): Promise<{result:T; error: string}> => {
  try {
   if (body.id) {
    const result: T = await axios.put(BASE_URL + `/questions/${body.id}`, body);
    return { result, error: '' };
   } else {
    const result: T = await axios.post(BASE_URL + `/questions`, body);
    return { result, error: '' };
   }
   
 } catch (e: { message: string }) {
    return { error: e.message, result: {} as T };
  }
};
export const getQuestion = async <T,>(id: string): Promise<{ question: T; error: string }> => {
  try {
    const { data: { result }} = await axios.get(BASE_URL + `/questions/${id}`)
    return { question: result as T, error: '' };
 } catch (e: { message: string }) {
    return { error: e.message, question: {} as T };
 }
};

export const login = async <T,>(email: string, password: string): Promise<T> => {
  try {
   return await axios.post(BASE_URL + '/auth/login', {
    "username": email,
    "password": password
   })
 } catch {
   return {} as T;
 }
};
export const logout = async <T,>(): Promise<T> => {
  try {
   return await axios.get(BASE_URL + '/auth/logout')
 } catch {
   return {} as T;
 }
};

export const getShedule = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get(BASE_URL + '/shedule');
  } catch {
    return { data: { result: [] }};
  }
}

export const getPrice = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get(BASE_URL + '/price');
  } catch {
    return { data: { result: [] }};
  }
}