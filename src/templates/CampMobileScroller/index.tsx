import { useRef, useState } from 'react';
import { CampCard } from '../../templates/CampCard';
import { Control } from '../controlArrow';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperInstance from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './index.module.css';

interface IProps {
  list: {
    id: string;
    name: string;
    dateString: string;
    imageCart?: { url: string } | null;
  }[];
  isMobile?: boolean;
  isAdmin?: boolean;
  openEditCamp?: (id: string) => void;
  to?: string;
}

export const CampsMobileScroller: React.FC<IProps> = ({
  list,
  isMobile,
  isAdmin,
  openEditCamp,
  to,
}) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const swiperRef = useRef<{ swiper: SwiperInstance } | null>(null);

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  if (!list.length) return null;

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation]}
      slidesPerView={isMobile ? 1 : 3}
      spaceBetween={isMobile ? 10 : 25}
      className={styles.cards_container}
      onRealIndexChange={(swiperCore) => {
        setSwiperIndex(swiperCore.realIndex);
      }}
    >
      {list.map((card) => (
        <SwiperSlide key={card.id} className={styles.row_cards}>
          <CampCard
            id={card.id}
            name={card.name}
            dateString={card.dateString}
            url={card.imageCart?.url}
            isMobile={isMobile}
            isAdmin={isAdmin}
            openEditCamp={openEditCamp}
            to={to}
          />
        </SwiperSlide>
      ))}
      <Control
        activeIndex={swiperIndex}
        maxCount={list.length ? list.length - 1 : 0}
        show={!isMobile && list.length > 3}
        onLeft={handlePrev}
        onRight={handleNext}
      />
    </Swiper>
  );
};
