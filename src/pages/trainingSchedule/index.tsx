import { CallMe } from '../../templates/callme';
import { Footer } from '../../templates/footer';
import { Price } from './price';
import { SheduleTable } from './sheduleTable';
import styles from './index.module.css';

export const Shedule = () => {
  return (
    <>
      <h1 className={styles.title}>Расписание тренировок</h1>

      <SheduleTable />

      <Price />

      <CallMe />

      <Footer />
    </>
  );
};
