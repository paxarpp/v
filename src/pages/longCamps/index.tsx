import { CallMe } from '../../templates/callme';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';
import { ICampItem } from './interfaces';
import { pl } from '../../api/pageLoader';
import styles from './index.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getLongCamps<ICampItem>();
  return { longCamps: result, error };
}

export default function LongCamps() {
  return (
    <div>
      <h2 className={styles.title}>Недельные кемпы</h2>

      <CampInfoIcons />

      <CampsList />

      <CallMe />
    </div>
  );
}
