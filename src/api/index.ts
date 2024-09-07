import axios, { Axios } from "axios";

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
   const result: T = await axios.put(BASE_URL + `/questions/${body.id ? body.id : ''}`, body);
   return { result, error: '' };
 } catch (e: { message: string }) {
    return { error: e.message, result: {} as T };
  }
};
export const getQuestion = async <T,>(id: string): Promise<{ question: T; error: string }> => {
  try {
    const question: T = await axios.get(BASE_URL + `/questions/${id}`)
    return { question, error: '' };
 } catch (e: { message: string }) {
    return { error: e.message, question: {} as T };
 }
};