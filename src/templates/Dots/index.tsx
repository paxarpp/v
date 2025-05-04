import styles from './index.module.css';

export const Dots: React.FC<{
  currentIndex: number;
  listLength: number;
  className?: string;
}> = ({ currentIndex, listLength, className }) => {
  return (
    <div className={`${styles.dots} ${className ? className : ''}`}>
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
