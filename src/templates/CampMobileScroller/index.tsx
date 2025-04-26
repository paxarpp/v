import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { CampCard } from '../../templates/CampCard';
import styles from './index.module.css';

interface IProps {
  list: {
    id: string;
    name: string;
    dateString: string;
    imageCart?: { url: string } | null;
  }[];
}

export const CampsMobileScroller: React.FC<IProps> = ({ list }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onLeftM = () => {
    if (!list.length) return;
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const onRightM = () => {
    if (!list.length) return;
    if (currentIndex < list.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onRightM,
    onSwipedRight: onLeftM,
    trackMouse: true,
  });

  if (!list.length) return null;

  return (
    <div {...swipeHandlers}>
      <CampCard
        key={list[currentIndex].id}
        id={list[currentIndex].id}
        name={list[currentIndex].name}
        dateString={list[currentIndex].dateString}
        url={list[currentIndex].imageCart?.url}
        isMobile={true}
      />
      <Dots currentIndex={currentIndex} listLength={list.length} />
    </div>
  );
};

const Dots: React.FC<{
  currentIndex: number;
  listLength: number;
}> = ({ currentIndex, listLength }) => {
  return (
    <div className={styles.dots}>
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
