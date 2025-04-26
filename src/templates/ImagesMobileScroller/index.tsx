import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './index.module.css';
import { createImageUrl } from '../../constants';

interface IProps {
  list: {
    id: string;
    name: string;
    url: string;
  }[];
}

export const ImagesMobileScroller: React.FC<IProps> = ({ list }) => {
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
      <div key={list[currentIndex].id} className={styles.images_container}>
        <div className={styles.stub_image}>
          <img
            src={createImageUrl(list[currentIndex].url)}
            alt={list[currentIndex].name}
            className={styles.image}
          />
        </div>
        <div className={styles.stub_image}>
          {list[currentIndex + 1] ? (
            <img
              src={createImageUrl(list[currentIndex + 1].url)}
              alt={list[currentIndex + 1].name}
              className={styles.image}
            />
          ) : null}
        </div>
      </div>

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
