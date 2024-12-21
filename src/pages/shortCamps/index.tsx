import { CallMe } from '../../templates/callme';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';
import { ICampItem } from './interfaces';
import { pl } from '../../api';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getShortCamps<ICampItem>();
  return { shortCamps: result, error };
}

export default function ShortCamps() {
  return (
    <div>
      <h2>Кемпы выходного дня</h2>
      <CampInfoIcons />

      <CampsList />

      <CallMe />
    </div>
  );
}
