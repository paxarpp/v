import { CallMe } from '../../templates/callme';
import { CampsList } from './campsList';
import { IPostCampItemList } from './interfaces';
import { pl } from '../../api/pageLoader';
import styles from './index.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getPastCamps<IPostCampItemList>();
  return { pastCamps: result, error };
}

export default function PastCamps() {
  return (
    <div>
      <h2 className={styles.title}>Прошедшие кемпы</h2>
      <CampsList />

      <CallMe />
    </div>
  );
}
