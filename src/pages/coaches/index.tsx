import { CoachesList } from './coachesList';
import { ICoach, IImage } from './interfaces';
import { pl } from '../../api/pageLoader';
import { api } from '../../api/api';
import { ImagesList } from './images';
import { useDeviceDetect } from '../../hooks';
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
  const { isMobile } = useDeviceDetect();
  return (
    <div>
      <h2 className={isMobile ? styles.title_top_mobi : styles.title_top}>
        Тренерский состав
      </h2>
      <h2 className={isMobile ? styles.title_down_mobi : styles.title_down}>
        в школе волейбола Magic Volley
      </h2>
      <CoachesList />

      <ImagesList />
    </div>
  );
}
