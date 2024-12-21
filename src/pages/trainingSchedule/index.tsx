import { CallMe } from '../../templates/callme';
import { Price } from './price';
import { SheduleTable } from './sheduleTable';
import { loaderPageShedule } from './loaders';
import styles from './index.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  return await loaderPageShedule();
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
