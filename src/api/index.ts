import axios from "axios";

export const getMediaAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get('/media/all')
  } catch {
    return { data: { result: [] }};
  }

}
export const getCoachesAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get('/coaches/all')
  } catch {
    return { data: { result: [] }};
  }
}
export const getCampsAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get('/camps/all')
  } catch {
    return { data: { result: [] }};
  }
}
export const getCamp = async <T,>(id: string): Promise<T> => {
  try {
    return await axios.get(`/camps/${id}`)
  } catch {
    return {} as T;
  }
}
export const getCoach = async <T,>(id: string): Promise<T> => {
  try {
    return await axios.get(`/coaches/${id}`)
  } catch {
    return {} as T;
  }
}

export const getQuestionAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  try {
    return await axios.get('/questions/all')
  } catch (e) {
    return { data: { result: [] }}; 
  }
}