import { useRef, useState } from 'react';
import { createImageUrl } from '../../constants';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperInstance from 'swiper';
import { ImageViewer } from '../imageViewer';
import { Control } from '../controlArrow';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './index.module.css';

interface IProps {
  list: {
    id: string;
    name: string;
    url: string;
  }[];
  isMobile: boolean;
}

export const ImagesMobileScroller: React.FC<IProps> = ({ list, isMobile }) => {
  const swiperRef = useRef<{ swiper: SwiperInstance } | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);

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
      modules={[Navigation, Pagination]}
      slidesPerView={isMobile ? 2 : 4}
      pagination={{ clickable: true }}
      spaceBetween={isMobile ? 10 : 30}
      breakpoints={{
        1024: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 2,
        },
        1600: {
          slidesPerView: 3,
        },
        1920: {
          slidesPerView: 4,
        },
      }}
      className={
        isMobile ? styles.images_container_mobi : styles.images_container
      }
      onRealIndexChange={(swiperCore) => {
        setSwiperIndex(swiperCore.realIndex);
      }}
    >
      {list.map((image) => (
        <SwiperSlide key={image.id} className={styles.stub_image}>
          <ImageViewer
            src={createImageUrl(image.url)}
            alt={image.name}
            className={styles.image}
          />
        </SwiperSlide>
      ))}
      <Control
        activeIndex={swiperIndex}
        maxCount={list.length ? list.length - 1 : 0}
        show={!isMobile && list.length > 4}
        onLeft={handlePrev}
        onRight={handleNext}
      />
    </Swiper>
  );
};
