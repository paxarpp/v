import { CoachesList } from './coachesList';
import { pl } from '../../api';
import { ICoach } from './interfaces';
import styles from './index.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getClassicCoachesAll<ICoach>();
  return { coaches: result, error };
}

export default function Coaches() {
  return (
    <div>
      <h1 className={styles.title}>
        Тренерский состав в школе волейбола Magic Volley
      </h1>
      <CoachesList />
    </div>
  );
}
