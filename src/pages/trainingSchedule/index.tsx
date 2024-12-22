import { CallMe } from '../../templates/callme';
import { Price } from './price';
import { SheduleTable } from './sheduleTable';
import { pl } from '../../api/pageLoader';
import styles from './index.module.css';
import { IPrice, IShedule } from './interfaces';

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
  return (
    <>
      <h1 className={styles.title}>Расписание тренировок</h1>

      <SheduleTable />

      <Price />

      <CallMe />
    </>
  );
}
