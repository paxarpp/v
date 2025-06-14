import styles from './index.module.css';

export const Dots: React.FC<{
  currentIndex: number;
  listLength: number;
  className?: string;
}> = ({ currentIndex, listLength, className }) => {
  return (
    <div className={`${styles.dots} ${className ? className : ''}`}>
      <Dot active={currentIndex === 0} />
      <Dot active={currentIndex != 0 && currentIndex < listLength - 1} />
      <Dot active={currentIndex === listLength - 1} />
    </div>
  );
};

export const Dot: React.FC<{ active?: boolean }> = ({ active }) => {
  return <span className={active ? styles.dot_active : styles.dot} />;
};
