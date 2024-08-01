import axios from "axios";

export const getMediaAll = async <T,>(): Promise<T[]> => {
  return await axios.get('/media/all')
}