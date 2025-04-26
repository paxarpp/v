import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { CampCard } from '../../templates/CampCard';
import { Dots } from '../Dots';

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
