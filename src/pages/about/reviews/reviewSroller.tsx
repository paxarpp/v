import { useRef, useState } from 'react';
import Setting from '../../../assets/setting.svg?react';
import { Control } from '../../../templates/controlArrow';
import { createImageUrl } from '../../../constants';
import { IReview } from '../interfaces';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperInstance from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../index.module.css';

interface IProps {
  list: IReview[];
  isMobile: boolean;
  isAdmin: boolean;
  openEditReview: (id?: string | null) => void;
}

export const ReviewScroller: React.FC<IProps> = ({
  list,
  isMobile,
  isAdmin,
  openEditReview,
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
      onRealIndexChange={(swiperCore) => {
        setSwiperIndex(swiperCore.realIndex);
      }}
    >
      {list.map((item, indx) => (
        <SwiperSlide
          key={item.name + indx}
          className={isMobile ? styles.review_card_mobi : styles.review_card}
        >
          <div className={styles.card_row_user}>
            <img
              src={createImageUrl(item.image?.url)}
              alt="user"
              className={isMobile ? styles.review_img_mobi : styles.review_img}
            />
            <div className={styles.reviewer}>
              <span className={isMobile ? styles.reviewer_t : ''}>
                {item.name}
              </span>
              <span className={isMobile ? styles.reviewer_sub_t : ''}>
                {item.date}
              </span>
            </div>
            {isAdmin ? (
              <Setting
                onClick={() => openEditReview(item.image?.entityId)}
                className={styles.setting_review}
              />
            ) : null}
          </div>
          <div
            className={
              isMobile ? styles.card_row_comment_mobi : styles.card_row_comment
            }
          >
            {item.comment}
          </div>
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
