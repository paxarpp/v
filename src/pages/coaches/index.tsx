import { CoachesList } from './coachesList';
import { ICoach, IImage } from './interfaces';
import { pl } from '../../api/pageLoader';
import { api } from '../../api/api';
import styles from './index.module.css';
import { ImagesList } from './images';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getBeachCoachesAll<ICoach>();
  const {
    data: { result: resImg },
  } = await api.getCoachesMedia<IImage>();
  return { coaches: result, error, images: resImg };
}

export default function Coaches() {
  return (
    <div>
      <h1 className={styles.title}>
        Тренерский состав в школе волейбола Magic Volley
      </h1>
      <CoachesList />

      <ImagesList />
    </div>
  );
}
