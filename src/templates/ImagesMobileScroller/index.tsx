import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { createImageUrl } from '../../constants';
import { Dots } from '../Dots';
import { ImageViewer } from '../imageViewer';
import styles from './index.module.css';

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
          <ImageViewer
            src={createImageUrl(list[currentIndex].url)}
            alt={list[currentIndex].name}
            className={styles.image}
          />
        </div>
        <div className={styles.stub_image}>
          {list[currentIndex + 1] ? (
            <ImageViewer
              src={createImageUrl(list[currentIndex + 1].url)}
              alt={list[currentIndex + 1].name}
              className={styles.image}
            />
          ) : null}
        </div>
      </div>

      <Dots
        currentIndex={currentIndex}
        listLength={list.length}
        className={styles.dots_mt5}
      />
    </div>
  );
};
