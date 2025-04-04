import { pl } from '../../api/pageLoader';
import { CallMe } from '../../templates/callme';
import { ICamp } from '../main/interfaces';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';
import styles from './index.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getChildCamps<ICamp>();
  return { childCamps: result, error };
}

export default function childCamps() {
  return (
    <div>
      <h2 className={styles.title}>Детские кемпы</h2>
      <CampInfoIcons />

      <CampsList />

      <CallMe />
    </div>
  );
}
