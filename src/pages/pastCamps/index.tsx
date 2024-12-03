import { CallMe } from '../../templates/callme';
import { CampsList } from './campsList';

export const PastCamps = () => {
  return (
    <div>
      <h2>Прошедшие кемпы</h2>

      <CampsList />

      <CallMe />
    </div>
  );
};
