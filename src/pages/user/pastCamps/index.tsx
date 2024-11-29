import { useAsyncValue } from 'react-router-dom';
import { IUser } from '../interfaces';
import { Scroller } from '../scroller';

export const PastCamps = () => {
  const { user } = useAsyncValue() as {
    user: IUser;
  };

  return <Scroller title={'Мои прошедшие кемпы'} camps={user.pastCamps} />;
};
