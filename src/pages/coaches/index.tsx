import { CoachesList } from './coachesList';
import { ICoach, IImage } from './interfaces';
import { pl } from '../../api/pageLoader';
import { api } from '../../api/api';
import { ImagesList } from './images';
import styles from './index.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getBeachCoachesAll<ICoach>();
  const {
    data: { result: resImg },
  } = await api.getCoachesMediaBeach<IImage>();
  return { coaches: result, error, images: resImg };
}

export default function Coaches() {
  return (
    <div>
      <h2 className={styles.title}>
        Тренерский состав в школе волейбола Magic Volley
      </h2>
      <CoachesList />

      <ImagesList />
    </div>
  );
}
