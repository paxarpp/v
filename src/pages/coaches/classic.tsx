import { CoachesList } from './coachesList';
import { pl } from '../../api/pageLoader';
import { ICoach, IImage } from './interfaces';
import { api } from '../../api/api';
import styles from './index.module.css';
import { ImagesList } from './images';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getClassicCoachesAll<ICoach>();
  const {
    data: { result: resImg },
  } = await api.getCoachesMediaClassic<IImage>();
  return { coaches: result, error, images: resImg };
}

export default function Coaches() {
  return (
    <div>
      <h2 className={styles.title_top}>Тренерский состав</h2>
      <h2 className={styles.title_down}>в школе волейбола Magic Volley</h2>
      <CoachesList />

      <ImagesList />
    </div>
  );
}
