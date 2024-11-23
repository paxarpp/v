import { defer } from 'react-router-dom';
import { getShotCamps } from '../../api';


const loaderShortCamps = async () => {
  const {
    data: { result, error },
  } = await getShotCamps<any>();
  return { shortCamps: result, error };
};

export const loaderPageShotCamps = async () => {
  return defer({ shortCamps: loaderShortCamps() });
};
