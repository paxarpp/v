import { CallMe } from '../../templates/callme';
import { Price } from './price';
import { SheduleTable } from './sheduleTable';
import { pl } from '../../api/pageLoader';
import { IPrice, IShedule } from './interfaces';
import { useDeviceDetect } from '../../hooks';
import styles from './index.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result: resShedule, error: errShedule },
  } = await pl.getShedule<IShedule>();
  const {
    data: { result: resPr, error: errPr },
  } = await pl.getPrice<IPrice>();
  return { trainingShedule: resShedule, errShedule, prices: resPr, errPr };
}

export default function Shedule() {
  const { isMobile } = useDeviceDetect();
  return (
    <>
      <h1 className={isMobile ? styles.title_mobi : styles.title}>
        Расписание тренировок
      </h1>

      <SheduleTable />

      <Price />

      <CallMe />
    </>
  );
}
