import axios from "axios";

export const getMediaAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  return await axios.get('/media/all')
}
export const getCoachesAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  return await axios.get('/coaches/all')
}
export const getCampsAll = async <T,>(): Promise<{ data: { result: T[]}}> => {
  return await axios.get('/camps/all')
}
export const getCamp = async <T,>(id: string): Promise<T> => {
  return await axios.get(`/camps/${id}`)
}
export const getCoach = async <T,>(id: string): Promise<T> => {
  return await axios.get(`/coaches/${id}`)
}