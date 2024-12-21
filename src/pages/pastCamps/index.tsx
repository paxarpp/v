import { CallMe } from '../../templates/callme';
import { CampsList } from './campsList';
import { ICampItem } from './interfaces';
import { pl } from '../../api';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getPastCamps<ICampItem>();
  return { pastCamps: result, error };
}

export default function PastCamps() {
  return (
    <div>
      <h2>Прошедшие кемпы</h2>
      <CampsList />

      <CallMe />
    </div>
  );
}
