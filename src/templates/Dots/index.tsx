import styles from './index.module.css';

export const Dots: React.FC<{
  currentIndex: number;
  listLength: number;
  withoutMT?: boolean;
}> = ({ currentIndex, listLength, withoutMT }) => {
  return (
    <div className={withoutMT ? styles.dots_mt0 : styles.dots}>
      <span className={currentIndex === 0 ? styles.dot_active : styles.dot} />
      <span
        className={
          currentIndex != 0 && currentIndex < listLength - 1
            ? styles.dot_active
            : styles.dot
        }
      />
      <span
        className={
          currentIndex === listLength - 1 ? styles.dot_active : styles.dot
        }
      />
    </div>
  );
};
